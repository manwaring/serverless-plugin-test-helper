import { all } from "deepmerge";

// source: https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-develop-integrations-lambda.html#http-api-develop-integrations-lambda.proxy-format
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
  constructor(override: NestedPartial<HttpApiEvent> = {}) {
    const extended = all([defaultEvent, override]) as HttpApiEvent;
    for (const [key, value] of Object.entries(extended)) {
      this[key] = value;
    }
  }
}

const defaultEvent: HttpApiEvent = {
  version: "2.0",
  routeKey: "$default",
  rawPath: "/my/path",
  rawQueryString: "parameter1=value1&parameter1=value2&parameter2=value",
  cookies: ["cookie1", "cookie2"],
  headers: {
    Header1: "value1",
    Header2: "value1,value2",
    "content-type": "application/json",
  },
  queryStringParameters: {
    parameter1: "value1,value2",
    parameter2: "value",
  },
  requestContext: {
    accountId: "123456789012",
    apiId: "api-id",
    authorizer: {
      jwt: {
        claims: {
          aud: "aud",
          azp: "azp",
          exp: "123",
          gty: "client-credentials",
          iat: "123",
          iss: "url",
          sub: "uniqueid",
        },
        scopes: ["scope1", "scope2"],
      },
    },
    domainName: "id.execute-api.us-east-1.amazonaws.com",
    domainPrefix: "id",
    http: {
      method: "POST",
      path: "/my/path",
      protocol: "HTTP/1.1",
      sourceIp: "IP",
      userAgent: "agent",
    },
    requestId: "id",
    routeKey: "$default",
    stage: "$default",
    time: "12/Mar/2020:19:03:58 +0000",
    timeEpoch: 1583348638390,
  },
  body: '{ "message": "hello from lambda" }',
  pathParameters: {
    parameter1: "value1",
  },
  isBase64Encoded: false,
  stageVariables: {
    stageVariable1: "value1",
    stageVariable2: "value2",
  },
};
