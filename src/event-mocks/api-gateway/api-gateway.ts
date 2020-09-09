import { all } from 'deepmerge';
import { APIGatewayEvent } from 'aws-lambda';

// source: https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/aws-lambda/common/api-gateway.d.ts
export class ApiGatewayEvent implements APIGatewayEvent {
	body: string | null;
	headers: { [name: string]: string };
	multiValueHeaders: { [name: string]: string[] };
	httpMethod: string;
	isBase64Encoded: boolean;
	path: string;
	pathParameters: { [name: string]: string } | null;
	queryStringParameters: { [name: string]: string } | null;
	multiValueQueryStringParameters: { [name: string]: string[] } | null;
	stageVariables: { [name: string]: string } | null;
	requestContext: {
		accountId: string;
		apiId: string;
		authorizer: { [name: string]: any } | null;
		connectedAt?: number;
		connectionId?: string;
		domainName?: string;
		domainPrefix?: string;
		eventType?: string;
		extendedRequestId?: string;
		protocol: string;
		httpMethod: string;
		identity: {
			accessKey: string | null;
			accountId: string | null;
			apiKey: string | null;
			apiKeyId: string | null;
			caller: string | null;
			cognitoAuthenticationProvider: string | null;
			cognitoAuthenticationType: string | null;
			cognitoIdentityId: string | null;
			cognitoIdentityPoolId: string | null;
			principalOrgId: string | null;
			sourceIp: string;
			user: string | null;
			userAgent: string | null;
			userArn: string | null;
		};
		messageDirection?: string;
		messageId?: string | null;
		path: string;
		stage: string;
		requestId: string;
		requestTime?: string;
		requestTimeEpoch: number;
		resourceId: string;
		resourcePath: string;
		routeKey?: string;
	};
	resource: string;

	constructor(override: NestedPartial<ApiGatewayEvent> = {}) {
		const extended = <ApiGatewayEvent>all([defaultEvent, override]);
		for (const [key, value] of Object.entries(extended)) {
			this[key] = value;
		}
	}
}

// source: https://serverless.com/framework/docs/providers/aws/events/apigateway/#example-lambda-proxy-event-default
const defaultEvent: ApiGatewayEvent = {
	resource: '/',
	path: '/',
	httpMethod: 'POST',
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
		'content-type': 'application/json',
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
	queryStringParameters: { key: 'value' },
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
