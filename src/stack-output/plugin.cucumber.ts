import { binding, then, given } from 'cucumber-tsflow';
import { expect } from 'chai';
import { StackOutputPlugin } from './plugin';

@binding()
class StackOutputPluginTest {
  plugin: StackOutputPlugin;

  @given(/a plugin/)
  public givenDirectory() {
    // this.plugin = new StackOutputPlugin();
  }
}

export = StackOutputPluginTest;
