# Example TypeScript project with custom configuration

1. [Overview of custom configuration options](#custom-configuration)
1. [Steps to deploy and test the app](#deploying-and-testing-the-example-app)
1. [Project setup and overview](#project-setup-and-overview) in case you're unfamiliar with any of the libraries being used

## Custom configurations

By default the plugin will save CloudFormation Stack Outputs to `.serverless/stack-output/output.yml` (this is the file referenced by the library).

The only custom configuration currently supported by the plugin is an optional `path` parameter specifying where a second copy of the CloudFormation Stack Outputs file should be saved to. This can be useful if you want to make use of the stack output data for any kind of post-deployment processing outside of the testing library functions already included in this package.

In the [serverless.yml](serverless.yml) for this custom project you'll see a 'custom' section which indicates that a second stack outputs file should be generated at `.stack-outputs.yml`:

```yml
custom:
  testHelper:
    path: .stack-outputs.yml
```

Below is the full specification for the optional configuration - you can create nested paths relative to the current directory, and specify a file type of either yml/yaml or json.

```yml
custom:
  testHelper: # This key is used by the plugin to pull in the optional path value
    path: optional/path/for/another/outputs[ .yml | .yaml | .json ]
```

## Deploying and testing the example app

_Prerequisite:_ Follow the [Serverless Framework AWS quick start](https://serverless.com/framework/docs/providers/aws/guide/quick-start/) for getting Node.js and the Serverless Framework installed and access to AWS configured

1. Unit test the application with `npm test`
1. Deploy the application with `sls deploy` or `npm run deploy` (`sls deploy --aws-profile [profile-name]` or `npm run deploy -- --aws-profile [profile-name]` if using named profiles)
1. E2E test the deployed application with `npm run e2e-test`

## Project setup and orientation

This project was generated with the aws-nodejs-typescript template using the `sls create -t aws-nodejs-typescript` command. Several files were then added/modified and multiple libraries were imported to get end-to-end testing up and running. (Note that these changes are consistent between the example projects)

### Changed files

- [src/handler.ts](src/handler.ts): moved this file from the project root to be under `src` instead for a cleaner project structure
- [package.json](package.json): additional libraries have been added which are required for testing, and also the latest `*` version of the `serverless-plugin-test-helper` so that I can automatically test new versions of the package after publishing
- [serverless.yml](serverless.yml): added the `serverless-plugin-test-helper` plugin to plugins section (along with the custom configuration detailed above), and a default stage under provider

### Added files

- [src/handler.e2e.test.ts](src/handler.e2e.test.ts): E2E test steps for calling the 'hello world' endpoint and validating its response (this file contains the `serverless-plugin-test-helper` library functions for exposing stack values such as the URL)
- [src/handler.test.ts](src/handler.test.ts): unit test steps for invoking the Lambda handler with the ApiGateway event mock payload
- [jest.config.js](jest.config.js): configuration file for Jest
- [README.md](README.md): this file, hopefully making it easier for you to use this package!
