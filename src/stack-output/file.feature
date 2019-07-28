Feature: Basic file config

  Scenario: Basic class instantiation
    Given a directory
    Then the directory is saved correctly
  
  Scenario Outline: Data is formatted correctly for all supported file types
    Given desired output file of type '<type>' 
    Then <input> is '<outcome>' into <output>
    
    Examples:
      | type | input            | outcome       | output                 |
      | yaml | '{"foo": "bar"}' | formatted     | 'foo: bar\n'           |
      | yml  | '{"foo": "bar"}' | formatted     | 'foo: bar\n'           |
      | json | '{"foo": "bar"}' | formatted     | '{\n  "foo": "bar"\n}' |
      | toml | '{"foo": "bar"}' | formatted     | 'foo = "bar"'          |
      | zip  | '{"foo": "bar"}' | not formatted | 'anything'             |
  
  Scenario Outline: Output file is successfully written
    Given desired output directory '<directory>' and file '<file>'
    Then <input> is '<outcome>' to '<directory>'

    Examples:
      | directory   | file       | input            | outcome     |
      | .test-output | test.yaml | '{"foo": "bar"}' | written     |
      | .test-output | test.yml  | '{"foo": "bar"}' | written     |
      | .test-output | test.json | '{"foo": "bar"}' | written     |
      | .test-output | test.toml | '{"foo": "bar"}' | written     |
      | .test-output | test.zip  | '{"foo": "bar"}' | not written |
