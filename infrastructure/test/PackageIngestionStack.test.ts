import { App } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { PackageIngestionStack } from '../src/stacks/PackageIngestionStack';

test('Snapshot', () => {
  const app = new App();
  const stack = new PackageIngestionStack(app, 'test');

  const assert = Template.fromStack(stack);
  expect(assert.toJSON()).toMatchSnapshot();

});
