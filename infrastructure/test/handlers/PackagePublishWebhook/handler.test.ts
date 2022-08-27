import { handler } from '../../../src/constructs/PackagePublishWebhook/PackagePublishWebhook.lambda';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const sampleEvent = require('./example-event.json');
// skipping this cause I was just using it for some touch testing
test.skip('thing', async () => {
  await handler(sampleEvent);
});
