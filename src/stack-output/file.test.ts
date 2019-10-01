import { existsSync } from 'fs';
import { StackOutputFile } from './file';

describe('Output file', () => {
  it('Writes a file to the correct location', () => {
    const data = { foo: 'bar' };
    const paths = [
      '.test-output/file/test.yaml',
      '.test-output/file/test.yml',
      '.test-output/file/test.json',
      '.test.yaml',
      '.test.yml',
      '.test.json'
    ];
    paths.forEach(path => {
      const file = new StackOutputFile(path, data);
      file.save();
      const fileExistsInSpecifiedLocation = existsSync(path);
      expect(fileExistsInSpecifiedLocation).toEqual(true);
    });
  });

  it('Throws an error given unsupported file type', () => {
    const data = { foo: 'bar' };
    const paths = [
      '.test-output/file/test.toml',
      '.test-output/file/test.zip',
      '.test-output/file/test.zip',
      '.test-output/file/test.xml',
      '.test-output/file/test.csv'
    ];
    paths.forEach(path => {
      const attempt = () => new StackOutputFile(path, data);
      expect(attempt).toThrowError();
    });
  });
});
