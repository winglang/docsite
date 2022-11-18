import { App } from 'aws-cdk-lib';
import { AuthorizationStack } from './stacks/AuthorizationStack';
import { PackageIngestionStack } from './stacks/PackageIngestionStack';

const app = new App();

const WEBSITE_ACCOUNT = '914426143740';
const env = {
  account: WEBSITE_ACCOUNT,
  region: 'us-east-1',
};
new PackageIngestionStack(app, 'PackageIngestion', {
  env: env,
});
new AuthorizationStack(app, 'ContributorPortalAuthorization', { env });

app.synth();
