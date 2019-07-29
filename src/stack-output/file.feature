Feature: Stack output file configuration

  Scenario: Basic class instantiation
    Given a directory
    Then the directory is saved correctly
  
  Scenario Outline: Data is formatted correctly for all supported file types
    Given desired output file of type '<extension>' 
    Then <input> is '<outcome>' into <output>
    
    Examples:
      | extension | input            | outcome       | output                 |
      | yaml      | '{"foo": "bar"}' | formatted     | 'foo: bar\n'           |
      | yml       | '{"foo": "bar"}' | formatted     | 'foo: bar\n'           |
      | json      | '{"foo": "bar"}' | formatted     | '{\n  "foo": "bar"\n}' |
      | toml      | '{"foo": "bar"}' | formatted     | 'foo = "bar"'          |
      | zip       | '{"foo": "bar"}' | not formatted | 'anything'             |
  
  Scenario Outline: Output file is successfully written to .serverless and specified location
    Given desired output directory '<directory>' and file '<file>'
    Then <input> is '<outcome>' to .serverless and '<directory>' '<file>'

    Examples:
      | directory    | file       | input           | outcome     | extension |
      | .test-output | test.yaml | '{"foo": "bar"}' | written     | yaml      |
      | .test-output | test.yml  | '{"foo": "bar"}' | written     | yml       |
      | .test-output | test.json | '{"foo": "bar"}' | written     | json      |
      | .test-output | test.toml | '{"foo": "bar"}' | written     | toml      |
      | .test-output | test.zip  | '{"foo": "bar"}' | not written | zip       |
