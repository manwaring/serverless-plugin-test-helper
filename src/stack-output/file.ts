import { writeFileSync, mkdirSync } from 'fs';

export class StackOutputFile {
  private path: string;
  private directory: string;
  private extension: string;
  private data: any;

  constructor(path: string, data: object) {
    this.path = path;
    this.directory = path && path.match(/.*\//) ? path.match(/.*\//)[0] : '';
    this.extension = (path && path.split('.').pop()) || '';
    this.data = this.format(data);
  }

  public save() {
    try {
      if (this.directory) {
        mkdirSync(this.directory, { recursive: true });
      }
      writeFileSync(this.path, this.data);
    } catch (err) {
      throw new Error(`Cannot write to file ${this.path}: ${err}`);
    }
  }

  private format(data: object) {
    switch (this.extension.toUpperCase()) {
      case 'JSON':
        return JSON.stringify(data, null, 2);
      case 'YAML':
      case 'YML':
        return require('js-yaml').safeDump(data);
      default:
        throw new Error(`No formatter found for '${this.extension}' extension`);
    }
  }
}
