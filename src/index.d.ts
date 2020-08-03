import {
  Context,
  APIGatewayEvent,
  DynamoDBStreamEvent,
  SNSEvent,
  CustomAuthorizerEvent,
  CloudFormationCustomResourceEvent,
} from 'aws-lambda';
export interface ExtendedAPIGatewayEvent extends APIGatewayEvent {
  auth: {
    claims: {
      aud: string;
      azp: string;
      exp: string;
      gty: string;
      iat: string;
      iss: string;
      sub: string;
    };
    scopes: any;
  };
}

// Getting stack output
export function getDeployedUrl(): string;
export function getApiGatewayUrl(): string;
export function getDeploymentBucket(): string;
export function getOutput(key: string): string;

// Helper objects/functions for testing
export const context: Context;
export function apiGatewayEvent(override?: NestedPartial<ExtendedAPIGatewayEvent>): ExtendedAPIGatewayEvent;
export function cloudFormationCustomResourceEvent(
  override?: NestedPartial<CloudFormationCustomResourceEvent>
): CloudFormationCustomResourceEvent;
export function customAuthorizerevent(override?: NestedPartial<CustomAuthorizerEvent>): CustomAuthorizerEvent;
export function dynamoDBStreamEvent(override?: NestedPartial<DynamoDBStreamEvent>): DynamoDBStreamEvent;
export function snsEvent(override?: NestedPartial<SNSEvent>): SNSEvent;
export class HttpApiEvent {
  version: string;
  routeKey: string;
  rawPath: string;
  rawQueryString: string;
  cookies: string[];
  headers: { [key: string]: string };
  queryStringParameters: { [key: string]: string };
  requestContext: {
    accountId: string;
    apiId: string;
    authorizer: {
      jwt: {
        claims: { [key: string]: string };
        scopes: string[];
      };
    };
    domainName: string;
    domainPrefix: string;
    http: {
      method: string;
      path: string;
      protocol: string;
      sourceIp: string;
      userAgent: string;
    };
    requestId: string;
    routeKey: string;
    stage: string;
    time: string;
    timeEpoch: number;
  };
  body: string;
  pathParameters: { [key: string]: string };
  isBase64Encoded: boolean;
  stageVariables: { [key: string]: string };
  constructor(override?: NestedPartial<HttpApiEvent>);
}

type NestedPartial<T> = {
  [P in keyof T]?: NestedPartial<T[P]>;
};
