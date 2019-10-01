import { StackOutputFile } from '../stack-output/file';
import { DEFAULT_OUTPUTS_PATH } from '../stack-output/plugin';
import { getDeployedUrl, getDeploymentBucket, getOutput } from './parser';
import { output } from './mock-data';

describe('Stack output parser', () => {
  const OLD_ENVS = process.env;

  const file = new StackOutputFile(DEFAULT_OUTPUTS_PATH, output);
  file.save();

  afterEach(() => {
    jest.resetAllMocks();
    process.env = OLD_ENVS;
  });

  it('Gets the deployed URL from stack output', () => {
    const urlFromFile = getDeployedUrl();
    const actualUrl = output.ServiceEndpoint;
    expect(urlFromFile).toEqual(actualUrl);
  });

  it('Gets the serverless deployment bucket from stack output', () => {
    const deploymentBucketFromFile = getDeploymentBucket();
    const actualDeploymentBucket = output.ServerlessDeploymentBucketName;
    expect(deploymentBucketFromFile).toEqual(actualDeploymentBucket);
  });

  it('Gets a valid property from the stack output', () => {
    const propertyFromFile = getOutput('MockLambdaFunctionQualifiedArn');
    const actualProperty = output.MockLambdaFunctionQualifiedArn;
    expect(propertyFromFile).toEqual(actualProperty);
  });

  it('Gets an empty value for non-existent property', () => {
    const missingProperty = getOutput('AnythingAtAll');
    expect(missingProperty).toBeUndefined();
  });

  it('Logs when debug env variable is set', () => {
    process.env.DEBUG = 'true';
    console.log = jest.fn();
    const urlFromFile = getDeployedUrl();
    expect(console.log).toHaveBeenCalled();
  });
});
