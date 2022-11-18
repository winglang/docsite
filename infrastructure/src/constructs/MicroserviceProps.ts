import { HttpApi, IHttpRouteAuthorizer } from '@aws-cdk/aws-apigatewayv2-alpha';

export interface MicroserviceProps {
  jwtAuthorizer: IHttpRouteAuthorizer;
  api: HttpApi;
}
