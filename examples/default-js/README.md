# Example JavaScript project with default configuration

1. [Overview of default configuration options](#default-configuration)
1. [Steps to deploy and test the app](#deploying-and-testing-the-example-app)
1. [Project setup and overview](#project-setup-and-overview) in case you're unfamiliar with any of the libraries being used

## Default configurations

By default the plugin will save CloudFormation Stack Outputs to `.serverless/stack-output/output.yml` (this is the file referenced by the library).

## Deploying and testing the example app

_Prerequisite:_ Follow the [Serverless Framework AWS quick start](https://serverless.com/framework/docs/providers/aws/guide/quick-start/) for getting Node.js and the Serverless Framework installed and access to AWS configured

1. Deploy the application with `sls deploy` or `npm run deploy` (`sls deploy --aws-profile [profile-name]` or `npm run deploy -- --aws-profile [profile-name]` if using named profiles)
1. Test the application with `npm test`

## Project setup and orientation

This project was generated with the aws-nodejs template using the `sls create -t aws-nodejs` command. Several files were then added/modified and multiple libraries were imported to get end-to-end testing up and running. (Note that these changes are consistent between the example projects)

Added files (top to bottom):

- [cucumber.js](cucumber.js): configuration file for using cucumber-js to drive tests (what can I say, I like BDD)
- [handler.cucumber.js](handler.cucumber.ts): test steps for calling the 'hello world' endpoint and validating it's response (this file contains the `serverless-plugin-test-helper` library functions for exposing stack values such as the URL)
- [handler.feature](handler.feature): Gherkin file defining how the test steps are called
- [package.json](package.json): added so that can include libraries for testing, and also the latest `*` version of the `serverless-plugin-test-helper` so that I can automatically test new versions of the package after publishing
- [README.md](README.md): this file, hopefully making it easier for you to use this package!

Changed files (top to bottom):

- [serverless.yml](serverless.yml): added the `serverless-plugin-test-helper` plugin to plugins section, and a default stage under provider

Added libraries (top to bottom of [package.json](package.json)):

- [chai](https://www.chaijs.com/): a BDD/TDD assertion library
- [cucumber](https://github.com/cucumber/cucumber-js): Cucumber is a testing tool that emphasizes human readability of the tests (via Gherkin feature files)
- [cucumber-pretty](https://github.com/kozhevnikov/cucumber-pretty): just a formatter for more verbose test output
- [request](https://github.com/request/request), [request-promise-native](https://github.com/request/request-promise-native): an incredibily populare HTTP client, and a wrapper which uses native promises
- [serverless](https://github.com/serverless/serverless): I prefer to keep a local copy of serverless to pin the version down more explicitly
- [serverless-plugin-test-helper](https://github.com/manwaring/serverless-plugin-test-helper): this project, because that's the whole point!