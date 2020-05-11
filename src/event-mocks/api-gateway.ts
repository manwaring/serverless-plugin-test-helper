import { APIGatewayEvent } from 'aws-lambda';
import { all } from 'deepmerge';

export function apiGatewayEvent(override: NestedPartial<ExtendedAPIGatewayEvent> = {}): ExtendedAPIGatewayEvent {
  return <ExtendedAPIGatewayEvent>all([defaultEvent, override]);
}

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

const auth = {
  claims: {
    sub: 'test-user',
  },
};

apiGatewayEvent({ auth });

// source: https://serverless.com/framework/docs/providers/aws/events/apigateway/#example-lambda-proxy-event-default

const defaultEvent: ExtendedAPIGatewayEvent = {
  resource: '/',
  path: '/',
  httpMethod: 'POST',
  auth: {
    claims: {
      aud: 'aud',
      azp: 'azp',
      exp: '123',
      gty: 'client-credentials',
      iat: '123',
      iss: 'url',
      sub: 'uniqueid',
    },
    scopes: null,
  },
  headers: {
    Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
    'Accept-Encoding': 'gzip, deflate, br',
    'Accept-Language': 'en-GB,en-US;q=0.8,en;q=0.6,zh-CN;q=0.4',
    'cache-control': 'max-age=0',
    'CloudFront-Forwarded-Proto': 'https',
    'CloudFront-Is-Desktop-Viewer': 'true',
    'CloudFront-Is-Mobile-Viewer': 'false',
    'CloudFront-Is-SmartTV-Viewer': 'false',
    'CloudFront-Is-Tablet-Viewer': 'false',
    'CloudFront-Viewer-Country': 'GB',
    'content-type': 'application/x-www-form-urlencoded',
    Host: 'j3ap25j034.execute-api.eu-west-2.amazonaws.com',
    origin: 'https://j3ap25j034.execute-api.eu-west-2.amazonaws.com',
    Referer: 'https://j3ap25j034.execute-api.eu-west-2.amazonaws.com/dev/',
    'upgrade-insecure-requests': '1',
    'User-Agent':
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36',
    Via: '2.0 a3650115c5e21e2b5d133ce84464bea3.cloudfront.net (CloudFront)',
    'X-Amz-Cf-Id': '0nDeiXnReyHYCkv8cc150MWCFCLFPbJoTs1mexDuKe2WJwK5ANgv2A==',
    'X-Amzn-Trace-Id': 'Root=1-597079de-75fec8453f6fd4812414a4cd',
    'X-Forwarded-For': '50.129.117.14, 50.112.234.94',
    'X-Forwarded-Port': '443',
    'X-Forwarded-Proto': 'https',
  },
  queryStringParameters: null,
  pathParameters: null,
  stageVariables: null,
  requestContext: {
    path: '/dev/',
    accountId: '125002137610',
    authorizer: undefined,
    protocol: undefined,
    resourceId: 'qdolsr1yhk',
    stage: 'dev',
    requestId: '0f2431a2-6d2f-11e7-b799-5152aa497861',
    requestTimeEpoch: null,
    identity: {
      cognitoIdentityPoolId: null,
      accountId: null,
      cognitoIdentityId: null,
      caller: null,
      apiKey: '',
      sourceIp: '50.129.117.14',
      accessKey: null,
      cognitoAuthenticationType: null,
      cognitoAuthenticationProvider: null,
      userArn: null,
      userAgent:
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36',
      user: null,
      apiKeyId: null,
      principalOrgId: null,
    },
    resourcePath: '/',
    httpMethod: 'POST',
    apiId: 'j3azlsj0c4',
  },
  body: 'postcode=LS17FR',
  isBase64Encoded: false,
  multiValueHeaders: null,
  multiValueQueryStringParameters: null,
};
