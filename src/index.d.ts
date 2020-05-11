import {
  Context,
  Callback,
  APIGatewayEvent,
  DynamoDBStreamEvent,
  SNSEvent,
  CustomAuthorizerEvent,
  CloudFormationCustomResourceEvent,
} from 'aws-lambda';
export interface ExtendedAPIGatewayEvent extends APIGatewayEvent {
  auth: {
    claims: any;
    [key: string]: any;
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

type NestedPartial<T> = {
  [P in keyof T]?: NestedPartial<T[P]>;
};
