import { writeFileSync, mkdirSync } from 'fs';

export class StackOutputFile {
  path: string;
  directory: string;
  extension: string;
  file: string;
  serverlessDirectory: string = '.serverless/stack-output';

  constructor(path: string) {
    this.path = path;
    this.directory = path.match(/.*\//) ? path.match(/.*\//)[0] : '';
    this.extension = path.split('.').pop() || '';
    this.file = path.match(/\/.*/) ? path.match(/\/.*/)[0] : '';
  }

  public save(data: object) {
    const content = this.format(data);
    try {
      mkdirSync(this.directory, { recursive: true });
      writeFileSync(this.path, content);
    } catch (err) {
      throw new Error(`Cannot write to file ${this.path}`);
    }
    try {
      mkdirSync(this.serverlessDirectory, { recursive: true });
      writeFileSync(`${this.serverlessDirectory}/${this.file}`, content);
    } catch (err) {
      throw new Error(`Cannot write to file ${this.serverlessDirectory}/${this.file}`);
    }
    return Promise.resolve();
  }

  public format(data: object) {
    switch (this.extension.toUpperCase()) {
      case 'JSON':
        return JSON.stringify(data, null, 2);
      case 'TOML':
        return require('tomlify-j0.4').toToml(data, null, 0);
      case 'YAML':
      case 'YML':
        return require('js-yaml').safeDump(data);
      default:
        throw new Error(`No formatter found for '${this.extension}' extension`);
    }
  }
}
