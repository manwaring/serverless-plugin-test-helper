import { existsSync } from 'fs';
import { binding, then, given, when } from 'cucumber-tsflow';
import { expect } from 'chai';
import { StackOutputFile } from './file';

@binding()
class StackOutputFileTest {
  file: StackOutputFile;
  attempt: Function;

  @given(/valid path '([^"]*)' and data '(.*)'/s)
  public givenSupportedPath(path: string, dataString: string) {
    const data = JSON.parse(dataString);
    this.file = new StackOutputFile(path, data);
  }

  @given(/unsupported path '([^"]*)' and data '(.*)'/s)
  public givenUnsupportedPath(path: string, dataString: string) {
    const data = JSON.parse(dataString);
    this.attempt = () => new StackOutputFile(path, data);
  }

  @when(/the file is saved/)
  public fileIsSaved() {
    this.file.save();
  }

  @then(/an error occurs/)
  public errorOccurs() {
    expect(this.attempt).to.throw();
  }

  @then(/a file is created at path '([^"]*)'/)
  public successfullyWritten(path: string) {
    const existsInSpecifiedLocation = existsSync(path);
    expect(existsInSpecifiedLocation).to.be.true;
  }
}

export = StackOutputFileTest;
