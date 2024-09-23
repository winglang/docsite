import { request } from "@octokit/request";
import fs from "node:fs/promises";
import tar from "tar";
import { glob } from "glob";
import { join, dirname } from 'node:path';
import { readFileSync, existsSync } from 'fs';

const authorization = `token ${process.env.GITHUB_TOKEN}`;

const WINGLIB_DIR_TEMP_DIR = join(process.cwd(), 'winglibs_versioned_docs', 'version-latest', 'winglibs');
const WINGLIB_DIR = join(WINGLIB_DIR_TEMP_DIR, '../', '05-winglibs');

const categoryFile = `label: winglibs
collapsible: true
collapsed: true
link:
  type: generated-index
  title: Wing Libs (winglibs)
`;

type WingLibPackage = {
  name: string;
  description: string;
  version: string;
  author?: {
    name: string;
    email: string;
  };
  repository?: {
    type: string;
    url: string;
    directory: string;
  };
  license?: string;
  wing?: {
    platforms?: string[];
    docs?: {
      title: string;
      summary: string;
      demoURL?: string;
    };
  };
};

const buildUrlsForPlatforms = (platforms: string[]) => {
  return platforms.map(platform => {
    switch (platform) {
      case 'sim':
        return `[${platform}](/docs/platforms/sim)`;
      case 'tf-aws':
        return `[${platform}](/docs/platforms/AWS/tf-aws)`;
      case 'awscdk':
        return `[${platform}](/docs/platforms/AWS/awscdk)`;
      case 'tf-gcp':
        return `[${platform}](/docs/platforms/google-cloud/tf-gcp)`;
      case 'tf-azure':
        return `[${platform}](/docs/platforms/microsoft-azure/tf-azure)`;
      case '*':
        return `[*](/docs/platforms/platforms)`;
      default:
        return platform
    }
  }).join(', ');
}

(async () => {

  console.log("Getting latest winglibs...");
  const tarball = await request('GET /repos/winglang/winglibs/tarball/main', {
    headers: {
      authorization
    },
  });

  await fs.mkdir("winglibs", { recursive: true });
  await fs.writeFile("winglibs.tgz", Buffer.from(tarball.data));

  console.log("Extracting winglibs...");
  await tar.extract({
    file: "winglibs.tgz",
    cwd: "winglibs",
  });


  const files = glob.sync("winglibs/**/**/README.md");

  let filteredWingLibs = files.map(file => {
    return {
      winglib: file.split('/')[2],
      readme: file,
      path: dirname(file)
    }
    // filter out the project README file
  }).filter(file => !file.winglib.includes('README.md'))

  // hydrate with Package JSON file
  const winglibs = filteredWingLibs.map(lib => {
    const packageJson = JSON.parse(readFileSync(join(lib.path, 'package.json'), { encoding: 'utf-8' })) as WingLibPackage;
    return {
      ...lib,
      packageJson,
      title: packageJson.wing?.docs?.title || lib.winglib,
      version: packageJson.version,
      description: packageJson.wing?.docs?.summary || packageJson.description,
      platforms: packageJson.wing?.platforms || [],
      demoURL: packageJson.wing?.docs?.demoURL || ''
    }
  });

  // Write files to WINGLIB_DIR
  await fs.rm(WINGLIB_DIR_TEMP_DIR, { force: true, recursive: true });
  await fs.mkdir(WINGLIB_DIR_TEMP_DIR, { recursive: true });

  // read all files in teh WINGLIB_DIR and find any that have winglib in the filename and remove it
  const filesInDir = await fs.readdir(join(WINGLIB_DIR));
  for (const file of filesInDir) {
    if(file.includes('-winglib-')) {
      await fs.rm(join(WINGLIB_DIR, file));
    }
  }

  // Write required docusuarus file for category
  await fs.writeFile(join(WINGLIB_DIR_TEMP_DIR, '_category_.yml'), categoryFile);

  let table = `---
title: List of winglibs
id: all-winglibs
sidebar_label: Explore all Wing libraries
description:  Table of all Wing libraries
keywords: [winglib, Wing library]
---

| Library  | Package name  | Version | Description  | Supported Wing platforms |
| -------- | ------- | ------- | ------- | ------- |`;


  // Create the table.
  // @ts-ignore
  for (const { title, version, description, platforms, demoURL, packageJson, winglib } of winglibs) {
    table += `\n| [${title}](/docs/libraries/winglibs/${winglib}) | [${packageJson.name}](/docs/libraries/winglibs/${winglib}) |  v${version} | ${description} ${demoURL ? `([Example](${demoURL}))` : ''} | ${buildUrlsForPlatforms(platforms)} |`;
  }

  // contributing to winglibs
  table += `\n\n## Contributing to winglibs

  Want to contribute your own winglib to this list? Check out the [contributing guide](https://github.com/winglang/winglibs?tab=readme-ov-file#how-do-i-add-a-new-library) for more information.

  `

  await fs.writeFile(join(WINGLIB_DIR_TEMP_DIR, '../04-toc.md'), table);


  for (const { winglib, readme, packageJson, title } of winglibs) {

    const content = await fs.readFile(readme, { encoding: 'utf-8' });

    // This is auto generated files for winglibs, if its there add it in
    const apiFile = join(dirname(readme), 'API.md');
    let apiFileContent = '';

    if(existsSync(apiFile)) {
      apiFileContent = await fs.readFile(apiFile, { encoding: 'utf-8' });
    }

    // remove any markdown images from the content (for now)
    let updatedContent = content.replace(/!\[.*\]\(.*\)/g, '');
    console.log(join(WINGLIB_DIR_TEMP_DIR, `${winglib}.md`))

    // Remove first header from README use docusuarus
    updatedContent = updatedContent.replace(/^#\s.*$/m, '');
    updatedContent = updatedContent.trim();


    const file = `---
title: ${title}
id: ${winglib}
sidebar_label: ${title}
description:  ${packageJson.wing?.docs?.summary || packageJson.description}
keywords: [winglib, Wing library]
---
${updatedContent}
---
${apiFileContent}
`

    await fs.writeFile(join(WINGLIB_DIR_TEMP_DIR, `${winglib}.md`), file);
  }

  // Move all the winglibs into the correct directory
  const filesInWingLib = await fs.readdir(join(WINGLIB_DIR));
  let fileIndex = filesInWingLib.length;
  for (const { winglib } of winglibs) {
    fileIndex =  fileIndex + 1;
    await fs.rename(join(WINGLIB_DIR_TEMP_DIR, `${winglib}.md`), join(WINGLIB_DIR, `${fileIndex}-winglib-${winglib}.md`));
  }

  await fs.rm(WINGLIB_DIR_TEMP_DIR, { force: true, recursive: true });

  console.log("Cleaning up...");
  await fs.rm("winglibs.tgz");
  await fs.rm("winglibs", {
    force: true,
    recursive: true,
  });
})();

