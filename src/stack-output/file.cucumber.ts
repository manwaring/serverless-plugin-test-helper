import { binding, then, given } from 'cucumber-tsflow';
import { expect } from 'chai';
import { StackOutputFile } from './file';

@binding()
class StackOutputFileTest {
  stackOutputFile: StackOutputFile;
  directory: string;
  information: { valid: boolean; file: string; type: string; data: any };

  @given(/a directory/)
  public givenDirectory() {
    const directory = __dirname;
    this.stackOutputFile = new StackOutputFile(directory);
    this.directory = directory;
  }

  @then(/the directory is saved correctly/)
  public directorySaved() {
    expect(this.stackOutputFile.path).to.equal(this.directory);
  }

  @given(/'([^"]*)' '([^"]*)' of '([^"]*)' with '(.*)'/s)
  public configuredFormatter(valid: boolean, file: string, type: string, data: any) {
    const information = { valid, file, type, data };
    this.stackOutputFile = new StackOutputFile(information.file);
    this.information = information;
  }

  @then(/the correct file format is determined/)
  public fileFormatDetected() {
    const output = { foo: 'bar' };
    if (this.information.valid) {
      expect(this.stackOutputFile.format(output)).to.equal(this.information.data);
    } else {
      expect(function() {
        this.stackOutputFile.format(output);
      }).to.throw();
    }
  }
}

export = StackOutputFileTest;
