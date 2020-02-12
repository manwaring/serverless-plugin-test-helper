import { DynamoDBStreamEvent, DynamoDBRecord } from 'aws-lambda';
import { all } from 'deepmerge';

export function dynamoDBStreamEvent(override: NestedPartial<DynamoDBStreamEvent> = {}): DynamoDBStreamEvent {
  const Records = override.Records
    ? all([defaultRecords, override.Records], { arrayMerge: combineMerge })
    : defaultRecords;
  return <DynamoDBStreamEvent>{ Records };
}

function combineMerge(target, source, options) {
  const destination = target.slice();
  source.forEach((item, index) => {
    if (typeof destination[index] === 'undefined') {
      destination[index] = options.cloneUnlessOtherwiseSpecified(item, options);
    } else if (options.isMergeableObject(item)) {
      destination[index] = all([target[index], item], options);
    }
  });
  return destination;
}

// source: https://docs.aws.amazon.com/lambda/latest/dg/with-ddb.html
const defaultRecords: DynamoDBRecord[] = [
  {
    eventID: '2',
    eventVersion: '1.0',
    dynamodb: {
      OldImage: {
        Message: { S: 'New item!' },
        Id: { N: '101' }
      },
      SequenceNumber: '222',
      Keys: {
        Id: { N: '101' }
      },
      SizeBytes: 59,
      NewImage: {
        Message: { S: 'This item has changed' },
        Id: { N: '101' }
      },
      StreamViewType: 'NEW_AND_OLD_IMAGES'
    },
    awsRegion: 'us-west-2',
    eventName: 'MODIFY',
    eventSourceARN: 'sourcearn',
    eventSource: 'aws:dynamodb'
  }
];
