import { ok, deepStrictEqual } from 'assert';
import { format } from 'util';
import { StackOutputFile } from './file';

export class StackOutputPlugin {
  public hooks: {};
  private output: OutputConfig;
  private file: string;
  private handler: string;
  private stackName: string;

  constructor(private serverless: Serverless, private options: Serverless.Options) {
    this.hooks = { 'after:deploy:deploy': this.process.bind(this) };
    this.output = this.serverless.service.custom.output;
    this.file = this.getConfig('file');
    this.handler = this.getConfig('handler');
    this.stackName = format(
      '%s-%s',
      this.serverless.service.getServiceName(),
      this.serverless.getProvider('aws').getStage()
    );
  }

  public hasConfig(key: string) {
    return !!this.output && !!this.output[key];
  }

  public hasHandler() {
    return this.hasConfig('handler');
  }

  public hasFile() {
    return this.hasConfig('file');
  }

  public getConfig(key: string) {
    return format('%s/%s', this.serverless.config.servicePath, this.output[key]);
  }

  public callHandler(data: object) {
    const splits = this.handler.split('.');
    const func = splits.pop() || '';
    const file = splits.join('.');

    const res = require(file)[func](data, this.serverless, this.options);

    return Promise.resolve(res);
  }

  public saveFile(data: object) {
    const f = new StackOutputFile(this.file);
    return f.save(data);
  }

  public fetch(): Promise<StackDescriptionList> {
    return this.serverless
      .getProvider('aws')
      .request(
        'CloudFormation',
        'describeStacks',
        { StackName: this.stackName },
        this.serverless.getProvider('aws').getStage(),
        this.serverless.getProvider('aws').getRegion()
      );
  }

  public beautify(data: { Stacks: Array<{ Outputs: StackOutputPair[] }> }) {
    const stack = data.Stacks.pop() || { Outputs: [] };
    const output = stack.Outputs || [];

    return output.reduce(
      (obj, item: StackOutputPair) => Object.assign(obj, { [item.OutputKey]: item.OutputValue }),
      {}
    );
  }

  public handle(data: object) {
    return Promise.all([this.handleHandler(data), this.handleFile(data)]);
  }

  public handleHandler(data: object) {
    return this.hasHandler()
      ? this.callHandler(data).then(() =>
          this.serverless.cli.log(format('Stack Output processed with handler: %s', this.output.handler))
        )
      : Promise.resolve();
  }

  public handleFile(data: object) {
    return this.hasFile()
      ? this.saveFile(data).then(() =>
          this.serverless.cli.log(format('Stack Output saved to file: %s', this.output.file))
        )
      : Promise.resolve();
  }

  public validate() {
    ok(this.serverless, 'Invalid serverless configuration');
    ok(this.serverless.service, 'Invalid serverless configuration');
    ok(this.serverless.service.provider, 'Invalid serverless configuration');
    ok(this.serverless.service.provider.name, 'Invalid serverless configuration');
    deepStrictEqual(this.serverless.service.provider.name, 'aws', 'Only supported for AWS provider');
    ok(this.options && !this.options.noDeploy, 'Skipping deployment with --noDeploy flag');
  }

  public process() {
    return Promise.resolve()
      .then(() => this.validate())
      .then(() => this.fetch())
      .then(res => this.beautify(res))
      .then(res => this.handle(res))
      .catch(err => this.serverless.cli.log(format('Cannot process Stack Output: %s!', err.message)));
  }
}
