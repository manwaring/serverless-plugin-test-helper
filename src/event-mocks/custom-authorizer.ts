import { CustomAuthorizerEvent, APIGatewayTokenAuthorizerEvent } from "aws-lambda";
import { all } from "deepmerge";

export function customAuthorizerEvent(override: NestedPartial<CustomAuthorizerEvent> = {}): CustomAuthorizerEvent {
  return <CustomAuthorizerEvent>all([defaultEvent, override]);
}

export class ApiGatewayTokenAuthorizerEvent implements APIGatewayTokenAuthorizerEvent {
  type: "TOKEN";
  methodArn: string;
  authorizationToken: string;

  constructor(override: NestedPartial<APIGatewayTokenAuthorizerEvent> = {}) {
    const extended = all([defaultEvent, override]) as ApiGatewayTokenAuthorizerEvent;
    for (const [key, value] of Object.entries(extended)) {
      this[key] = value;
    }
  }
}

const defaultEvent: CustomAuthorizerEvent = {
  type: "TOKEN",
  authorizationToken: "allow",
  methodArn: "arn:aws:execute-api:us-west-2:123456789012:ymy8tbxw7b/*/GET/",
};
