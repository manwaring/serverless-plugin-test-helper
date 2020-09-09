import { dynamoDBStreamEvent } from './deprecated-dynamodb-stream';

describe('DynamoDB Stream event', () => {
  it('Overrides properties correctly', () => {
    const override = {
      Records: [
        {
          eventID: '3',
          dynamodb: {
            NewImage: {
              Id: { N: '102' }
            }
          }
        }
      ]
    };
    const event = dynamoDBStreamEvent(override);
    expect(event.Records.length).toEqual(1);
    expect(event.Records[0].eventID).toEqual('3');
    expect(event.Records[0].dynamodb.Keys).toEqual({ Id: { N: '101' } });
    expect(event.Records[0].dynamodb.NewImage.Id).toEqual({ N: '102' });
  });

  it('Returns default object when no overrides are specified', () => {
    const event = dynamoDBStreamEvent();
    expect(event.Records.length).toEqual(1);
    expect(event.Records[0].eventID).toEqual('2');
    expect(event.Records[0].dynamodb.NewImage.Id).toEqual({ N: '101' });
  });
});
