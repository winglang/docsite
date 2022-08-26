process.env.GITHUB_PAT_SECRET_ARN = 'arn:aws:secretsmanager:us-east-1:914426143740:secret:SSHSecret8CF72A3C-3f7oPrZA56XH-uQ7LzV';
process.env.AWS_PROFILE='monada-website';
import { handler } from '../../../src/constructs/PackagePublishWebhook/PackagePublishWebhook.lambda';

const sampleEvent = require('./example-event.json');
test('thing', async () => {
  await handler(sampleEvent);
});
