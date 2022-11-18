const { awscdk } = require('projen');
const { NodePackageManager } = require('projen/lib/javascript');
const project = new awscdk.AwsCdkTypeScriptApp({
  cdkVersion: '2.38.1',
  defaultReleaseBranch: 'main',
  name: 'infrastructure',
  packageManager: NodePackageManager.NPM,
  deps: [
    '@aws-cdk/aws-apigatewayv2-alpha',
    '@aws-cdk/aws-apigatewayv2-authorizers-alpha',
    '@aws-cdk/aws-apigatewayv2-integrations-alpha',
    '@aws-sdk/client-secrets-manager',
    '@types/aws-lambda',
    'axios',
    'cdk-iam-floyd',
    'cdk-lambda-layer-zip',
  ],
  projenrcTs: true,
});
project.synth();
