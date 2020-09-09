import { snsEvent } from './deprecated-sns';

describe('SNS event', () => {
  it('Overrides properties correctly', () => {
    const override = {
      Records: [
        {
          Sns: {
            Subject: 'updated subject',
            Message: 'updated message'
          }
        }
      ]
    };
    const event = snsEvent(override);
    expect(event.Records[0].Sns.Message).toEqual('updated message');
    expect(event.Records[0].Sns.Subject).toEqual('updated subject');
    expect(event.Records[0].Sns.Type).toEqual('Notification');
  });

  it('Returns default object when no overrides are specified', () => {
    const event = snsEvent();
    expect(event.Records[0].Sns.Message).toEqual('hello world');
    expect(event.Records[0].Sns.Subject).toEqual('');
    expect(event.Records[0].Sns.Type).toEqual('Notification');
  });
});
