import { App } from 'aws-cdk-lib';
import { PackageIngestionStack } from './stacks/PackageIngestionStack';

const app = new App();

const WEBSITE_ACCOUNT = '914426143740';
new PackageIngestionStack(app, 'PackageIngestion', {
  env: {
    account: WEBSITE_ACCOUNT,
    region: 'us-east-1',
  },
});
app.synth();
