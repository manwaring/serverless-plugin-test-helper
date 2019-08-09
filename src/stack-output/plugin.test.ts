import { binding, then, given, when } from 'cucumber-tsflow';
import { expect } from 'chai';
import { StackOutputPlugin, DEFAULT_OUTPUTS_PATH } from './plugin';
import { defaultServerless, defaultOptions, customServerless, invalidServerless } from './mock-data';
import { existsSync } from 'fs';

@binding()
class StackOutputPluginTest {
  plugin: StackOutputPlugin;
  attempt: Function;

  @given(/a plugin with no path specified/)
  public givenNoPathPlugin() {
    this.plugin = new StackOutputPlugin(defaultServerless, defaultOptions);
  }

  @given(/a plugin with custom path specified/)
  public givenCustomPathPlugin() {
    this.plugin = new StackOutputPlugin(customServerless, defaultOptions);
  }

  @given(/a plugin with invalid configurations/)
  public givenInvalidPlugin() {
    this.attempt = () => new StackOutputPlugin(invalidServerless, defaultOptions);
  }

  @when(/the plugin is invoked/)
  public async pluginInvoked() {
    await this.plugin.getAndSaveStackOutput();
  }

  @then(/the testing stack output file is saved/)
  public testingStackOutputSaved() {
    const path = DEFAULT_OUTPUTS_PATH;
    const exists = existsSync(path);
    expect(exists).to.be.true;
  }

  @then(/the custom stack output file is saved/)
  public customStackOutputSaved() {
    const path = customServerless.service.custom.testHelper.path;
    const exists = existsSync(path);
    expect(exists).to.be.true;
  }

  @then(/an error occurs/)
  public errorOccurs() {
    expect(this.attempt).to.throw();
  }
}

export = StackOutputPluginTest;
