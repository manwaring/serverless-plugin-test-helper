import { existsSync } from "fs";
import { StackOutputPlugin, DEFAULT_OUTPUTS_PATH } from "./plugin";
import { defaultServerless, defaultOptions, customServerless } from "./mock-data";

describe("Serverless plugin", () => {
  it("Saves file to default path when none specified", async () => {
    const plugin = new StackOutputPlugin(defaultServerless, defaultOptions);
    await plugin.getAndSaveStackOutput();
    const fileExistsInSpecifiedLocation = existsSync(DEFAULT_OUTPUTS_PATH);
    expect(fileExistsInSpecifiedLocation).toEqual(true);
  });

  it("Saves file to custom path when specified", async () => {
    const plugin = new StackOutputPlugin(customServerless, defaultOptions);
    await plugin.getAndSaveStackOutput();
    const filePath = customServerless.service.custom.testHelper.path;
    const fileExistsInSpecifiedLocation = existsSync(filePath);
    expect(fileExistsInSpecifiedLocation).toEqual(true);
  });

  it("Throws error from invalid configuration", () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const attempt = () => new StackOutputPlugin({}, defaultOptions);
    expect(attempt).toThrowError();
  });
});
