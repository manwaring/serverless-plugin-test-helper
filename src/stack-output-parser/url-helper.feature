Feature: Stack output URL parser
  
  Scenario: Parse URL content from stack output
    Given a valid stack outputs file exists
    When the URL is retrieved
    Then the URL matches the file value
