import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { BackendApi } from '../constructs/BackendApi';
import { IsPrivateAccessAuthorizedMicroservice } from '../constructs/IsPrivateAccessAuthorizedMicroservice';

export class AuthorizationStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps = {}) {
    super(scope, id, props);


    const backendApi = new BackendApi(this, 'BackendApi');
    new IsPrivateAccessAuthorizedMicroservice(this, 'IsPrivateAccessAuthorized', {
      jwtAuthorizer: backendApi.jwtAuthorizer,
      api: backendApi.api,
    });

  }
}
