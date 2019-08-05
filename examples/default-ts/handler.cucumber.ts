import { binding, then, when } from 'cucumber-tsflow';
import { expect } from 'chai';
import { get } from 'request-promise-native';
import { getDeployedUrl } from 'serverless-plugin-test-helper';

const URL = getDeployedUrl();

@binding()
export class HelloTest {
  private response: any;

  @when(/we call hello/)
  public async callHello() {
    this.response = JSON.parse(await get(`${URL}/hello`));
  }

  @then(/the response should say hello/)
  public responseSaysHello() {
    expect(this.response.message).to.equal(
      'Go Serverless Webpack (Typescript) v1.0! Your function executed successfully!'
    );
  }
}
