import { binding, then, given, when } from 'cucumber-tsflow';
import { expect } from 'chai';
import { StackOutputFile } from '../stack-output/file';
import { DEFAULT_OUTPUTS_PATH } from '../stack-output/plugin';
import { getDeployedUrl, getDeploymentBucket, getOutput } from './parser';
import { output } from './mock-data';

@binding()
class ParserTest {
  retrieved: string;

  @given(/a valid stack outputs file exists/)
  public validStackOutput() {
    const file = new StackOutputFile(DEFAULT_OUTPUTS_PATH, output);
    file.save();
  }

  @when(/the deployed URL is retrieved/)
  public urlRetrieved() {
    this.retrieved = getDeployedUrl();
  }

  @when(/the deployment bucket is retrieved/)
  public bucketRetrieved() {
    this.retrieved = getDeploymentBucket();
  }

  @when(/an output value is retrieved/)
  public valueRetrieved() {
    this.retrieved = getOutput('MockLambdaFunctionQualifiedArn');
  }

  @when(/an output value that doesn't exist is retrieved/)
  public missingValueRetrieved() {
    this.retrieved = getOutput('AnythingAtAll');
  }

  @then(/the URL matches the file value/)
  public urlMatches() {
    expect(this.retrieved).to.equal(output.ServiceEndpoint);
  }

  @then(/the bucket matches the file value/)
  public bucketMatches() {
    expect(this.retrieved).to.equal(output.ServerlessDeploymentBucketName);
  }

  @then(/the value matches the file value/)
  public valueMatches() {
    expect(this.retrieved).to.equal(output.MockLambdaFunctionQualifiedArn);
  }

  @then(/the value is empty/)
  public valueEmpty() {
    expect(this.retrieved).to.equal('');
  }
}

export = ParserTest;
