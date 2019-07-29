import { existsSync } from 'fs';
import { binding, then, given } from 'cucumber-tsflow';
import { expect } from 'chai';
import { StackOutputFile, TESTING_OUTPUTS_PATH } from './file';

@binding()
class StackOutputFileTest {
  file: StackOutputFile;
  directory: string;

  @given(/a directory/)
  public givenDirectory() {
    const directory = __dirname;
    this.file = new StackOutputFile(directory);
    this.directory = directory;
  }

  @then(/the directory is saved correctly/)
  public directorySaved() {
    expect(this.file.path).to.equal(this.directory);
  }

  @given(/desired output file of type '([^"]*)'/)
  public configuredFormatter(type: string) {
    this.file = new StackOutputFile(`test.${type}`);
  }

  @then(/'(.*)' is '([^"]*)' into '(.*)'/s)
  public turnsInputIntoValidOutput(inputString: string, outcome: string, output: string) {
    const input = JSON.parse(inputString);
    const valid = outcome.toUpperCase() === 'FORMATTED' ? true : false;
    if (valid) {
      expect(this.file.format(input)).to.equal(output);
    } else {
      expect(function() {
        this.file.format(input);
      }).to.throw();
    }
  }

  @given(/desired output directory '([^"]*)' and file '([^"]*)'/)
  public givenDirectoryAndFile(directory: string, file: string) {
    this.file = new StackOutputFile(`${directory}/${file}`);
  }

  @then(/'(.*)' is '([^"]*)' to .serverless and '([^"]*)' '([^"]*)'/s)
  public async successfullyWritten(inputString: string, outcome: string, directory: string, file: string) {
    const input = JSON.parse(inputString);
    const valid = outcome.toUpperCase() === 'WRITTEN' ? true : false;
    if (valid) {
      await this.file.save(input);
      const existsInSpecifiedLocation = existsSync(`${directory}/${file}`);
      const existsInServerlessDirectory = existsSync(TESTING_OUTPUTS_PATH);
      expect(existsInSpecifiedLocation).to.be.true;
      expect(existsInServerlessDirectory).to.be.true;
    }
  }
}

export = StackOutputFileTest;
