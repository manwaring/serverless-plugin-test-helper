import { binding, then, given, when } from 'cucumber-tsflow';
import { expect } from 'chai';
import { StackOutputFile } from '../stack-output/file';
import { TESTING_OUTPUTS_PATH } from '../stack-output/plugin';
import { getDeployedUrl } from './url-helper';
import { output } from './mock-data';

@binding()
class UrlHelperTest {
  retrieved: string;

  @given(/a valid stack outputs file exists/)
  public validStackOutput() {
    const file = new StackOutputFile(TESTING_OUTPUTS_PATH, output);
    file.save();
  }

  @when(/the URL is retrieved/)
  public urlRetrieved() {
    this.retrieved = getDeployedUrl();
  }

  @then(/the URL matches the file value/)
  public errorOccurs() {
    expect(this.retrieved).to.equal(output.ServiceEndpoint);
  }
}

export = UrlHelperTest;
