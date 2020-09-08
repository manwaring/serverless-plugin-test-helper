import { customAuthorizerEvent } from './custom-authorizer';

describe('Custom Authorizer event', () => {
  it('Overrides properties correctly', () => {
    const override = {
      authorizationToken: 'deny'
    };
    const event = customAuthorizerEvent(override);
    expect(event.type).toEqual('TOKEN');
    expect(event.authorizationToken).toEqual('deny');
    expect(event.methodArn).toEqual('arn:aws:execute-api:us-west-2:123456789012:ymy8tbxw7b/*/GET/');
  });

  it('Returns default object when no overrides are specified', () => {
    const event = customAuthorizerEvent();
    expect(event.type).toEqual('TOKEN');
    expect(event.authorizationToken).toEqual('allow');
    expect(event.methodArn).toEqual('arn:aws:execute-api:us-west-2:123456789012:ymy8tbxw7b/*/GET/');
  });
});
