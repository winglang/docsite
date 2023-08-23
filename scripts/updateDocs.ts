import { request } from "@octokit/request";
import fs from "node:fs/promises";
import tar from "tar";

const authorization = `token ${process.env.GITHUB_TOKEN}`;

(async () => {
  console.log("Downloading latest release...");
  const release = await request("GET /repos/winglang/wing/releases/latest", {
    headers: {
      authorization,
    },
  });
  console.log("Release:", release);
  console.log("Release version:", release.data.tag_name);

  console.log("Looking for the docs.tgz asset...");
  const asset = release.data.assets.find((asset) => asset.name === "docs.tgz");
  console.log("Asset:", asset);

  console.log("Downloading latest docs.tgz...");
  const docsTgz = await request(
    `GET /repos/winglang/wing/releases/assets/${asset.id}`,
    {
      headers: {
        authorization,
        accept: "application/octet-stream",
      },
    }
  );
  await fs.writeFile("docs.tgz", Buffer.from(docsTgz.data));

  console.log("Extracting docs...");
  await tar.extract({
    file: "docs.tgz",
  });

  console.log("Updating versioned_docs/version-latest...");
  await fs.rm("versioned_docs/version-latest", {
    force: true,
    recursive: true,
  });
  await fs.cp("docs/docs", "versioned_docs/version-latest", {recursive: true});

  console.log("contributing_versioned_docs/version-latest...");
  await fs.rm("contributing_versioned_docs/version-latest", {
    force: true,
    recursive: true,
  });
  await fs.cp("docs/contributing", "contributing_versioned_docs/version-latest", {recursive: true});

  console.log("Cleaning up...");
  await fs.rm("docs.tgz");
  await fs.rm("docs", {
    force: true,
    recursive: true,
  });
})();
