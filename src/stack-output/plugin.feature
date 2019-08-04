Feature: Stack output plugin configuration

  Scenario: Plugin with no path specified
    Given a plugin with no path specified
    When the plugin is invoked
    Then the testing stack output file is saved

  Scenario: Plugin with custom path specified
    Given a plugin with custom path specified
    When the plugin is invoked
    Then the testing stack output file is saved
    And the custom stack output file is saved

  Scenario: Plugin with invalid configuration
    Given a plugin with invalid configurations
    Then an error occurs