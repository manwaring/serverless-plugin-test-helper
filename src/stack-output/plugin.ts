import { ok, deepStrictEqual } from 'assert';
import { StackOutputFile } from './file';

export const DEFAULT_OUTPUTS_PATH: string = '.serverless/stack-output/outputs.yml';

export class StackOutputPlugin {
  public hooks: {};
  private config: TestHelperConfig;

  constructor(private serverless: Serverless, private options: Serverless.Options) {
    this.hooks = { 'after:deploy:deploy': this.getAndSaveStackOutput.bind(this) };
    this.config = serverless.service.custom ? serverless.service.custom.testHelper : {};
  }

  public async getAndSaveStackOutput() {
    try {
      this.validate();
      const output = await this.getStackOutput();
      const formattedOutput = this.formatStackOutput(output);
      this.saveStackOutput(formattedOutput);
    } catch (err) {
      this.serverless.cli.log(`Cannot process stack output: ${err.message}`);
    }
  }

  private validate() {
    ok(this.serverless, 'Invalid serverless configuration');
    ok(this.serverless.service, 'Invalid serverless configuration');
    ok(this.serverless.service.provider, 'Invalid serverless configuration');
    ok(this.serverless.service.provider.name, 'Invalid serverless configuration');
    deepStrictEqual(this.serverless.service.provider.name, 'aws', 'Only supported for AWS provider');
    ok(this.options && !this.options.noDeploy, 'Skipping deployment with --noDeploy flag');
  }

  private getStackOutput(): Promise<StackDescriptionList> {
    const aws = this.serverless.getProvider('aws');
    const stage = aws.getStage();
    const region = aws.getRegion();
    const StackName = aws.naming.getStackName();
    return aws.request('CloudFormation', 'describeStacks', { StackName }, stage, region);
  }

  private formatStackOutput(data: { Stacks: Array<{ Outputs: StackOutputPair[] }> }) {
    const stack = data.Stacks.pop() || { Outputs: [] };
    const output = stack.Outputs || [];

    return output.reduce(
      (obj, item: StackOutputPair) => Object.assign(obj, { [item.OutputKey]: item.OutputValue }),
      {}
    );
  }

  private saveStackOutput(data: object) {
    if (this.config && this.config.path) {
      this.saveStackOutputToPath(this.config.path, data);
    }
    this.saveStackOutputToPath(DEFAULT_OUTPUTS_PATH, data);
  }

  private saveStackOutputToPath(path: string, data: object) {
    const file = new StackOutputFile(path, data);
    file.save();
    this.serverless.cli.log(`Stack Output saved to file: ${path}`);
  }
}
