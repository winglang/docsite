import { CfnOutput, Duration, Stack, StackProps } from 'aws-cdk-lib';
import { FunctionUrlAuthType, LayerVersion } from 'aws-cdk-lib/aws-lambda';
import { Secret } from 'aws-cdk-lib/aws-secretsmanager';
import { ZipLayer } from 'cdk-lambda-layer-zip';
import { Construct } from 'constructs';
import { PackagePublishWebhookFunction } from '../constructs/PackagePublishWebhook/PackagePublishWebhook-function';
import {
  EMAIL_KEY,
  GITHUB_CONFIG_KEY,
  GITHUB_SSH_PRIVATE_KEY,
  KNOWN_HOSTS_KEY,
  PAT_KEY,
  USERNAME_KEY,
} from '../constructs/PackagePublishWebhook/PackagePublishWebhook.lambda';

export class PackageIngestionStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps = {}) {
    super(scope, id, props);

    const sshConfigSecret = new Secret(this, 'SSHConfigSecret', {
      description: 'A secret to hold some SSH information for git',
      generateSecretString: {
        secretStringTemplate: JSON.stringify({
          [PAT_KEY]: '',
          [KNOWN_HOSTS_KEY]: '',
          [USERNAME_KEY]: '',
          [EMAIL_KEY]: '',
        }),
        generateStringKey: PAT_KEY,
      },
    });

    const sshSecret = new Secret(this, 'SSHSecret', {
      description: 'An ssh private key for accessing GitHub',

    });

    // create the handler
    const packagePublishWebhookFunction = new PackagePublishWebhookFunction(this, 'PackagePublishWebhook', {
      environment: {
        [GITHUB_CONFIG_KEY]: sshConfigSecret.secretArn,
        [GITHUB_SSH_PRIVATE_KEY]: sshSecret.secretArn,
      },
      timeout: Duration.minutes(5),
    });

    sshConfigSecret.grantRead(packagePublishWebhookFunction);
    sshSecret.grantRead(packagePublishWebhookFunction);

    // add a lambda layer for zip
    packagePublishWebhookFunction.addLayers(new ZipLayer(this, 'ZipLayer'));

    // add git layer
    packagePublishWebhookFunction.addLayers(LayerVersion.fromLayerVersionArn(this, 'SSHLayer', 'arn:aws:lambda:us-east-1:553035198032:layer:git-lambda2:8'));

    // set up the functionurl for webhooks
    const functionUrl = packagePublishWebhookFunction.addFunctionUrl({
      authType: FunctionUrlAuthType.NONE,
    });

    // what is our webhook url?
    new CfnOutput(this, 'PackagePublishWebhookUrl', {
      value: functionUrl.url,
    });
  }
}
