import { HttpMethod } from '@aws-cdk/aws-apigatewayv2-alpha';
import { HttpLambdaIntegration } from '@aws-cdk/aws-apigatewayv2-integrations-alpha';
import { Secret } from 'aws-cdk-lib/aws-secretsmanager';
import { Construct } from 'constructs';
import { IsAuthorizedFunction } from './IsAuthorized/IsAuthorized-function';
import { GITHUB_PAT_SECRET_KEY } from './IsAuthorized/IsAuthorized.lambda';
import { MicroserviceProps } from './MicroserviceProps';


interface IsPrivateAccessAuthorizedMicroserviceProps extends MicroserviceProps {
}

export class IsPrivateAccessAuthorizedMicroservice extends Construct {
  constructor(scope: Construct, id: string, props: IsPrivateAccessAuthorizedMicroserviceProps) {
    super(scope, id);
    const githubPatSecret = Secret.fromSecretNameV2(this, 'GithubPatSecret', 'GithubPat3F666C99-Zcz9I7ZTR1Lv');

    const handler = new IsAuthorizedFunction(this, 'IsAuthorized', {
      environment: {
        [GITHUB_PAT_SECRET_KEY]: githubPatSecret.secretArn,
      },
    });

    githubPatSecret.grantRead(handler);
    props.api.addRoutes({
      authorizer: props.jwtAuthorizer,
      path: '/isAuthorized',
      methods: [HttpMethod.GET],
      integration: new HttpLambdaIntegration('github', handler),
    });
  }
}
