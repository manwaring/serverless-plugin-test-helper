import { existsSync } from 'fs';
import { StackOutputPlugin, DEFAULT_OUTPUTS_PATHS } from './plugin';
import { defaultServerless, defaultOptions, customServerless, invalidServerless } from './mock-data';

describe('Serverless plugin', () => {
  it('Saves file to default path when none specified', async () => {
    const plugin = new StackOutputPlugin(defaultServerless, defaultOptions);
    await plugin.getAndSaveStackOutput();
    for (const path of DEFAULT_OUTPUTS_PATHS) {
      const fileExistsInSpecifiedLocation = existsSync(path);
      expect(fileExistsInSpecifiedLocation).toEqual(true);
    }
  });

  it('Saves file to custom path when specified', async () => {
    const plugin = new StackOutputPlugin(customServerless, defaultOptions);
    await plugin.getAndSaveStackOutput();
    const filePath = customServerless.service.custom.testHelper.path;
    const fileExistsInSpecifiedLocation = existsSync(filePath);
    expect(fileExistsInSpecifiedLocation).toEqual(true);
  });

  it('Throws error from invalid configuration', () => {
    // @ts-ignore
    const attempt = () => new StackOutputPlugin({}, defaultOptions);
    expect(attempt).toThrowError();
  });
});
