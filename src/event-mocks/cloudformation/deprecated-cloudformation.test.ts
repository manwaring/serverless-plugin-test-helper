import { cloudFormationCustomResourceEvent } from './deprecated-cloudformation';

describe('CloudFormation Custom Resource event', () => {
  it('Overrides properties correctly', () => {
    const override = {
      ResourceProperties: {
        Name: 'new name',
        ServiceToken: 'new token'
      }
    };
    const event = cloudFormationCustomResourceEvent(override);
    expect(event.ResourceProperties.Name).toEqual('new name');
    expect(event.ResourceProperties.List).toEqual(['1', '2', '3']);
    expect(event.ResourceProperties.ServiceToken).toEqual('new token');
  });

  it('Returns default object when no overrides are specified', () => {
    const event = cloudFormationCustomResourceEvent();
    expect(event.ResourceProperties.Name).toEqual('Value');
    expect(event.ResourceProperties.List).toEqual(['1', '2', '3']);
    expect(event.ResourceProperties.ServiceToken).toEqual('');
  });
});
