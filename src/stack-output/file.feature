Feature: Stack output file configuration
  
  Scenario Outline: Output file is successfully written to specified location
    Given valid path '<path>' and data <data>
    When the file is saved
    Then a file is created at path '<path>'

    Examples:
      | path                        | data             |
      | .test-output/file/test.yaml | '{"foo": "bar"}' |
      | .test-output/file/test.yml  | '{"foo": "bar"}' |
      | .test-output/file/test.json | '{"foo": "bar"}' |
      | .test.yaml                  | '{"foo": "bar"}' |
      | .test.yml                   | '{"foo": "bar"}' |
      | .test.json                  | '{"foo": "bar"}' |

  Scenario Outline: Output file type is not supported
    Given unsupported path '<path>' and data <data>
    Then an error occurs

    Examples:
      | path                        | data             |
      | .test-output/file/test.toml | '{"foo": "bar"}' |
      | .test-output/file/test.zip  | '{"foo": "bar"}' |
      | .test-output/file/test.xml  | '{"foo": "bar"}' |
      | .test-output/file/test.csv  | '{"foo": "bar"}' |