const { awscdk } = require('projen');
const { NodePackageManager } = require('projen/lib/javascript');
const project = new awscdk.AwsCdkTypeScriptApp({
  cdkVersion: '2.38.1',
  defaultReleaseBranch: 'main',
  name: 'infrastructure',
  packageManager: NodePackageManager.NPM,
  deps: [
    '@types/aws-lambda',
    '@aws-sdk/client-secrets-manager',
    'axios',
    'cdk-iam-floyd',
    'cdk-lambda-layer-zip',
  ],
  projenrcTs: true,
});
project.synth();
