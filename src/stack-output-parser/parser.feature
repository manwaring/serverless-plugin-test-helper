Feature: Stack output parser
  
  Scenario: Get deployed URL from stack output
    Given a valid stack outputs file exists
    When the deployed URL is retrieved
    Then the URL matches the file value

  Scenario: Get serverless deployment bucket from stack output
    Given a valid stack outputs file exists
    When the deployment bucket is retrieved
    Then the bucket matches the file value

  Scenario: Get property from the stack output
    Given a valid stack outputs file exists
    When an output value is retrieved
    Then the value matches the file value

  Scenario: Get property that doesn't exist
    Given a valid stack outputs file exists
    When an output value that doesn't exist is retrieved
    Then the value is empty
