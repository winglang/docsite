import { request } from "@octokit/request";
import fs from "node:fs/promises";
import tar from "tar";
import { glob } from "glob";
import { join, dirname } from 'node:path';
import { readFileSync } from 'fs';

const authorization = `token ${process.env.GITHUB_TOKEN}`;

const WINGLIB_DIR = join(process.cwd(), 'versioned_docs', 'version-latest', '04-winglibs', '05-winglibs');
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

const getCloudProvidersFromPlatforms = (platforms: string[]) => {
  let providers = platforms.map(platform => {
    switch (platform) {
      case 'tf-aws':
      case 'awscdk':
        return `[Amazon Web Services](https://aws.amazon.com/)`;
      case 'tf-gcp':
        return `[Google Cloud](https://cloud.google.com/)`;
      case 'tf-azure':
        return `[Microsoft Azure](https://azure.microsoft.com/)`;
      case '*':
        return ['[Amazon Web Services](https://aws.amazon.com/)', '[Google Cloud](https://cloud.google.com/)', '[Microsoft Azure](https://azure.microsoft.com/)'];
      default:
        return ''
    }
  }).filter(provider => provider !== '').flat();

  // return unique values
  return providers.filter((provider, index) => providers.indexOf(provider) === index).join(', ');

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
  await fs.rm(WINGLIB_DIR, { force: true, recursive: true });
  await fs.mkdir(WINGLIB_DIR, { recursive: true });

  // Write required docusuarus file for category
  await fs.writeFile(join(WINGLIB_DIR, '_category_.yml'), categoryFile);

  let table = `---
title: List of winglibs
id: all-winglibs
sidebar_label: List of winglibs
description:  Table of all Wing libraries
keywords: [winglib, Wing library]
---

| Library  | Package name  | Version | Description | Supported cloud providers | Supported Wing platforms |
| -------- | ------- | ------- | ------- | ------- | ------- |`;


  // Create the table.
  // @ts-ignore
  for (const { title, version, description, platforms, demoURL, packageJson, winglib } of winglibs) {
    table += `\n| [${title}](/docs/winglibs/winglibs/${winglib}) | [${packageJson.name}](/docs/winglibs/winglibs/${winglib}) |  v${version} | ${description} ${demoURL ? `([Example](${demoURL}))` : ''} | ${getCloudProvidersFromPlatforms(platforms)} | ${buildUrlsForPlatforms(platforms)} |`;
  }

  // contributing to winglibs
  table += `\n\n## Contributing to winglibs

  Want to contribute your own winglib to this list? Check out the [contributing guide](https://github.com/winglang/winglibs?tab=readme-ov-file#how-do-i-add-a-new-library) for more information.

  `

  await fs.writeFile(join(WINGLIB_DIR, '../04-toc.md'), table);


  for (const { winglib, readme, packageJson, title } of winglibs) {

    const content = await fs.readFile(readme, { encoding: 'utf-8' });
    // remove any markdown images from the content (for now)
    const contentWithoutImages = content.replace(/!\[.*\]\(.*\)/g, '');
    console.log(join(WINGLIB_DIR, `${winglib}.md`))

    const file = `---
title: ${title}
id: ${winglib}
sidebar_label: ${title}
description:  ${packageJson.wing?.docs?.summary || packageJson.description}
keywords: [winglib, Wing library]
---
${contentWithoutImages}
`

    await fs.writeFile(join(WINGLIB_DIR, `${winglib}.md`), file);
  }

  console.log("Cleaning up...");
  await fs.rm("winglibs.tgz");
  await fs.rm("winglibs", {
    force: true,
    recursive: true,
  });
})();

