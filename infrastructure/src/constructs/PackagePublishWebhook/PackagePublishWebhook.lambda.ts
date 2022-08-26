import * as child_process from 'child_process';
import { execSync } from 'child_process';
import { createWriteStream, writeFileSync } from 'fs';
import util from 'util';
import { GetSecretValueCommand, SecretsManagerClient } from '@aws-sdk/client-secrets-manager';
import axios from 'axios';


const exec = util.promisify(child_process.exec);

interface GitHubWebhookEvent {
  body: string;
}

interface GithubRelease {
  release: {
    name: string;
    assets_url: string;
    zipball_url: string;
    tarball_url: string;
  };
}

export const GITHUB_CONFIG_KEY = 'GITHUB_CONFIG_SECRET_ARN';
export const GITHUB_SSH_PRIVATE_KEY = 'GITHUB_SSH_PRIVATE_KEY_SECRET_ARN';
export const KNOWN_HOSTS_KEY = 'known_hosts';
export const USERNAME_KEY = 'username';
export const EMAIL_KEY = 'email';
export const ID_RSA_KEY = 'id_rsa';
export const PAT_KEY = 'pat';

const secretArn = process.env[GITHUB_CONFIG_KEY];
const privateKeyArn = process.env[GITHUB_SSH_PRIVATE_KEY];
const client = new SecretsManagerClient({});

let secret: {
  [PAT_KEY]: string;
  [KNOWN_HOSTS_KEY]: string;
  [ID_RSA_KEY]: string;
  [USERNAME_KEY]: string;
  [EMAIL_KEY]: string;
};

async function getPat() {
  const results = await client.send(new GetSecretValueCommand({ SecretId: secretArn }));
  if (!results.SecretString) {
    throw new Error('The GitHub Secret has no value');
  }
  secret = JSON.parse(results.SecretString);
  return secret[PAT_KEY];
}

async function getReleaseAssets(body: GithubRelease) {
  const pat = await getPat();
  const response = await axios.get(body.release.tarball_url, {
    responseType: 'stream',
    headers: {
      Authorization: `token ${pat}`,
    },
    maxRedirects: 1,
  });
  const pipePromise = new Promise((resolve) => {
    response.data.pipe(createWriteStream('/tmp/package.tar'));
    response.data.on('end', () => resolve(null));
  });
  await pipePromise;
  const results = await exec('tar -xvf /tmp/package.tar', { cwd: '/tmp/' });
  const outDir = results.stdout.split('\n')[0];
  console.log(outDir);
  return `/tmp/${outDir}`;
}

async function getPrivateKey() {
  const results = await client.send(new GetSecretValueCommand({ SecretId: privateKeyArn }));
  if (!results.SecretString) {
    throw new Error('The GitHub Private Key Secret has no value');
  }
  return results.SecretString!;
}

async function getRepo() {

  if (!secret) {
    throw new Error("why don't we have a secret yet?");
  }
  const id_rsa = await getPrivateKey();
  const known_hostsFilename = '/tmp/known_hosts';
  execSync(`ssh-keyscan -t rsa github.com >> ${known_hostsFilename}`);

  // Get this from a safe place, say SSM
  const id_rsaFilename = '/tmp/id_rsa';
  execSync(`touch ${id_rsaFilename} && rm ${id_rsaFilename}`);
  writeFileSync(id_rsaFilename, id_rsa, { encoding: 'utf8' });
  execSync(`chmod 400 ${id_rsaFilename}`, { encoding: 'utf8', stdio: 'inherit' });

  process.env.GIT_SSH_COMMAND = `ssh -o UserKnownHostsFile=${known_hostsFilename} -i ${id_rsaFilename}`;

  const localClone = '/tmp/docs';
  const remoteRepo = 'git@github.com:monadahq/winglang-docs.git';
  console.log('Cleaning up, in case...');
  execSync(`rm -rf ${localClone}`);
  console.log('Cloning...');
  execSync(`git clone --depth 1 ${remoteRepo} ${localClone}`, { encoding: 'utf8', stdio: 'inherit' });
  console.log('Cloned!');
  execSync(`ls ${localClone}`, { encoding: 'utf8' }).split('\n');
  return localClone;
}

function copyDocsOver(releaseNumber: string, releaseAssetDir: string, docsCloneDir: string) {
  const apiDocFilename = `${releaseAssetDir}API.md`;
  const stripedVersionNumber = releaseNumber.replace('v', '');
  const previousVersionFilename = `${docsCloneDir}/docs/reference/previous_versions/WingSDK/${stripedVersionNumber}.md`;


  // add headmatter to the previous versions file:
  console.log('Writing headmatter to top of file');
  const previousVersionHeadmatterFile = '/tmp/headmatter';
  writeFileSync(previousVersionHeadmatterFile, `---
title: ${stripedVersionNumber}
---
`);
  execSync(`cat ${previousVersionHeadmatterFile} ${apiDocFilename} > ${previousVersionFilename}`);
  execSync(`ls ${docsCloneDir}/docs/reference/previous_versions/WingSDK/`);

  // copy over to main location:
  console.log('Copying to latest...');
  const latestVersionHeadMatterFile = '/tmp/main-headmatter';
  writeFileSync(latestVersionHeadMatterFile, `---
title: WingSDK - ${stripedVersionNumber}
sidebar_position: 2
---
`);
  const latestVersionFilename = `${docsCloneDir}/docs/reference/WingSDK.md`;
  execSync(`cat ${latestVersionHeadMatterFile} ${apiDocFilename} > ${latestVersionFilename}`);

}

function branchAndPush(releaseNumber: string, cloneDir: string) {
  const branchName = `docs/wingsdk-${releaseNumber}`;
  const { [USERNAME_KEY]: gitUsername, [EMAIL_KEY]: gitEmail } = secret;
  const options = {
    cwd: cloneDir,
  };
  execSync(`git checkout -b ${branchName}`, options);
  execSync('git add docs/reference/previous_versions/WingSDK/*', options);
  execSync(`git -c user.email=${gitEmail} -c user.name=${gitUsername} commit -m "Adding WingSDK Docs ${releaseNumber}"`, options);
  execSync(`git push -u origin ${branchName}`, options);
  return branchName;
}

async function createPullRequest(branchName: string, releaseNumber: string) {
  const { [PAT_KEY]: pat } = secret;
  const results = await axios.post('https://api.github.com/repos/monadahq/winglang-docs/pulls', {
    title: `docs: Adding WingSDK Reference docs for ${releaseNumber}`,
    head: branchName,
    base: 'main',
    body: `This is an automated Pull Request created to incorporate the WingSDK reference docs for version ${releaseNumber}`,
  }, {
    headers: {
      Authorization: `token ${pat}`,

    },
  });
  console.log(results);
}

export const handler = async (event: GitHubWebhookEvent) => {
  if (!secretArn) {
    throw new Error(`Please provide a GitHub PAT secret on the environment variable ${GITHUB_CONFIG_KEY}`);
  }
  // console.log('Event:', JSON.stringify(event, null, 2));
  const body: GithubRelease = JSON.parse(event.body);
  // console.log('Body:', JSON.stringify(body, null, 2));
  const releaseAssetDir = await getReleaseAssets(body);

  const docsCloneDir = await getRepo();

  const releaseNumber = body.release.name;
  copyDocsOver(releaseNumber, releaseAssetDir, docsCloneDir);
  const branchName = branchAndPush(releaseNumber, docsCloneDir);
  await createPullRequest(branchName, releaseNumber);
};
