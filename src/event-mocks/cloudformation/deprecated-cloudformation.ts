import { CloudFormationCustomResourceEvent } from 'aws-lambda';
import { all } from 'deepmerge';

export function cloudFormationCustomResourceEvent(
  override: NestedPartial<CloudFormationCustomResourceEvent> = {}
): CloudFormationCustomResourceEvent {
  console.warn(`Creating a mock CloudFormation Custom Resource event by calling 'cloudFormationCustomResourceEvent()' has been deprecated and will be removed in a future release - use 'new CloudFormationCustomResourceEvent()' instead`);
  return <CloudFormationCustomResourceEvent>all([defaultEvent, override]);
}

const defaultEvent: CloudFormationCustomResourceEvent = {
  RequestType: 'Create',
  ResponseURL: 'http://pre-signed-S3-url-for-response',
  StackId: 'arn:aws:cloudformation:us-west-2:123456789012:stack/stack-name/guid',
  RequestId: 'unique id for this create request',
  ResourceType: 'Custom::TestResource',
  LogicalResourceId: 'MyTestResource',
  ResourceProperties: {
    Name: 'Value',
    List: ['1', '2', '3'],
    ServiceToken: ''
  },
  ServiceToken: ''
};
