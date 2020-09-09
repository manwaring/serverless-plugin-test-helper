import { CustomAuthorizerEvent } from 'aws-lambda';
import { all } from 'deepmerge';

export function customAuthorizerEvent(override: NestedPartial<CustomAuthorizerEvent> = {}): CustomAuthorizerEvent {
  console.warn(`Creating a mock API Gateway Custom Authorizer event by calling 'customAuthorizerEvent()' has been deprecated and will be removed in a future release - use 'new CustomAuthorizerEvent()' instead`);
  return <CustomAuthorizerEvent>all([defaultEvent, override]);
}

const defaultEvent: CustomAuthorizerEvent = {
  type: 'TOKEN',
  authorizationToken: 'allow',
  methodArn: 'arn:aws:execute-api:us-west-2:123456789012:ymy8tbxw7b/*/GET/'
};
