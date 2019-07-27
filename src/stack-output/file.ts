import { writeFileSync } from 'fs';

export class StackOutputFile {
  constructor(public path: string) {}

  public format(data: object) {
    const ext = this.path.split('.').pop() || '';

    switch (ext.toUpperCase()) {
      case 'JSON':
        return JSON.stringify(data, null, 2);
      case 'TOML':
        return require('tomlify-j0.4').toToml(data, null, 0);
      case 'YAML':
      case 'YML':
        return require('js-yaml').safeDump(data);
      default:
        throw new Error(`No formatter found for '${ext}' extension`);
    }
  }

  public save(data: object) {
    const content = this.format(data);

    try {
      writeFileSync(this.path, content);
    } catch (e) {
      throw new Error('Cannot write to file: ' + this.path);
    }

    return Promise.resolve();
  }
}
