import { binding, then, given } from 'cucumber-tsflow';
import { expect } from 'chai';
import { StackOutputPlugin } from './plugin';
import { serverless, options, handler, file } from './mock-data/standard.serverless';

@binding()
class StackOutputPluginTest {
  plugin: StackOutputPlugin;

  @given(/valid plugin configuration/)
  public givenPlugin() {
    this.plugin = new StackOutputPlugin(serverless, options);
  }

  @then(/the fields are set correctly/)
  public fieldsSetCorrectly() {
    expect(() => this.plugin.validate()).to.not.throw();
    expect(this.plugin.hasHandler()).to.be.true;
    expect(this.plugin.getConfig('handler')).to.contain(handler);
    expect(this.plugin.hasFile()).to.be.true;
    expect(this.plugin.getConfig('file')).to.contain(file);
  }
}

export = StackOutputPluginTest;
