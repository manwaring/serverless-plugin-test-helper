import { ApiGatewayEvent } from './api-gateway';

describe('API Gateway event', () => {
  it('Overrides properties correctly', () => {
    const override = {
      httpMethod: 'GET',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      queryStringParameters: { param: 'value' },
      body: null,
    };
    const event = new ApiGatewayEvent(override);
    expect(event.httpMethod).toEqual(override.httpMethod);
    expect(event.headers).not.toEqual(override.headers);
    expect(event.headers['content-type']).toEqual(override.headers['content-type']);
    expect(event.queryStringParameters).not.toEqual(override.queryStringParameters);
    expect(event.queryStringParameters['param']).toEqual(override.queryStringParameters['param']);
    expect(event.body).toEqual(override.body);
  });

  it('Returns default object when no overrides are specified', () => {
    const event = new ApiGatewayEvent();
    expect(event.httpMethod).toEqual('POST');
    expect(event.headers['content-type']).toEqual('application/json');
  });
});
