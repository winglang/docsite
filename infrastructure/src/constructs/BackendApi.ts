import { HttpApi } from '@aws-cdk/aws-apigatewayv2-alpha';
import { HttpJwtAuthorizer } from '@aws-cdk/aws-apigatewayv2-authorizers-alpha';
import { CfnOutput } from 'aws-cdk-lib';
import { Construct } from 'constructs';

export class BackendApi extends Construct {
  api: HttpApi;
  jwtAuthorizer: HttpJwtAuthorizer;

  constructor(scope: Construct, id: string) {
    super(scope, id);
    this.jwtAuthorizer = new HttpJwtAuthorizer('Auth0', 'https://dev-9zrd68w6.us.auth0.com/', {
      jwtAudience: ['https://api.contribute.monada.co'],
      identitySource: ['$request.header.Authorization'],
      authorizerName: 'Auth0',
    });

    this.api = new HttpApi(this, 'Api', {
      apiName: 'ContributorPortalApi',
      createDefaultStage: true,
      // defaultDomainMapping: {
      //   domainName: new DomainName(this, 'DomainName', {
      //     domainName: 'api.winglang.io',
      //     certificate: new DnsValidatedCertificate()
      //   },
      // },
    });

    new CfnOutput(this, 'ApiEndpoint', {
      value: this.api.url!,
    });
  }

}
