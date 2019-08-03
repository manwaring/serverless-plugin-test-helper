import { binding, then, given, when } from 'cucumber-tsflow';
import { expect } from 'chai';
import { StackOutputPlugin, TESTING_OUTPUTS_PATH } from './plugin';
import { defaultServerless, defaultOptions, customServerless, customOptions } from './mock-data';
import { existsSync } from 'fs';

@binding()
class StackOutputPluginTest {
  plugin: StackOutputPlugin;

  @given(/a plugin with no path specified/)
  public givenNoPathPlugin() {
    this.plugin = new StackOutputPlugin(defaultServerless, defaultOptions);
  }

  @given(/a plugin with custom path specified/)
  public givenCustomPathPlugin() {
    this.plugin = new StackOutputPlugin(customServerless, customOptions);
  }

  // @given(/invalid plugin configuration/)
  // public givenInvalidPlugin() {
  //   // @ts-ignore
  //   this.plugin = new StackOutputPlugin(invalidServerless, options);
  // }

  @when(/the plugin is invoked/)
  public async pluginInvoked() {
    await this.plugin.getAndSaveStackOutput();
  }

  @then(/the testing stack output file is saved/)
  public testingStackOutputSaved() {
    const path = TESTING_OUTPUTS_PATH;
    const exists = existsSync(path);
    expect(exists).to.be.true;
  }

  @then(/the custom stack output file is saved/)
  public customStackOutputSaved() {
    const path = customServerless.service.custom.testHelper.path;
    const exists = existsSync(path);
    expect(exists).to.be.true;
  }
}

export = StackOutputPluginTest;
