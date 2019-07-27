Feature: Basic file config

  # Scenario: Basic constructor config
  #   Given a directory
  #   Then the directory is saved correctly
  
  Scenario Outline: Formatting works correctly for all file types
    Given '<valid>' '<file>' of '<type>' with <data> 
    Then the correct file format is determined
    
    Examples:
      | valid | file       | type | data                   |
      | true  | test.yaml  | yaml | 'foo: bar\n'           |
      | true  | test.yml   | yaml | 'foo: bar\n'           |
      | true  | test.json  | json | '{\n  "foo": "bar"\n}' |
      | true  | test.toml  | toml | 'foo = "bar"'          |
      # | false | test.zip   |      |                    |
