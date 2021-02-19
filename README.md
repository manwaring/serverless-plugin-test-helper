<p align="center">
  <img height="150" src="https://d1wzvcwrgjaybe.cloudfront.net/repos/manwaring/serverless-plugin-test-helper/readme-category-icon.png">
  <img height="150" src="https://d1wzvcwrgjaybe.cloudfront.net/repos/manwaring/serverless-plugin-test-helper/readme-repo-icon.png">
</p>

<p align="center">
  <a href="https://npmjs.com/package/serverless-plugin-test-helper">
    <img src="https://flat.badgen.net/npm/v/serverless-plugin-test-helper?icon=npm&label=npm@latest"></a>
  <a href="https://www.npmjs.com/package/serverless-plugin-test-helper">
    <img src="https://flat.badgen.net/npm/dt/serverless-plugin-test-helper?icon=npm"></a>
  <a href="https://codecov.io/gh/manwaring/serverless-plugin-test-helper">
    <img src="https://flat.badgen.net/codecov/c/github/manwaring/serverless-plugin-test-helper/?icon=codecov"></a>
  <a href="https://packagephobia.now.sh/result?p=@manwaring/serverless-plugin-test-helper">
    <img src="https://flat.badgen.net/packagephobia/install/serverless-plugin-test-helper"></a>
  <a href="https://www.npmjs.com/package/serverless-plugin-test-helper">
    <img src="https://flat.badgen.net/npm/license/serverless-plugin-test-helper"></a>
  <br/>
  <a href="https://circleci.com/gh/manwaring/serverless-plugin-test-helper">
    <img src="https://flat.badgen.net/circleci/github/manwaring/serverless-plugin-test-helper/master?icon=circleci"></a>
  <a href="https://flat.badgen.net/dependabot/manwaring/serverless-plugin-test-helper">
    <img src="https://flat.badgen.net/dependabot/manwaring/serverless-plugin-test-helper/?icon=dependabot&label=dependabot"></a>
  <a href="https://david-dm.org/manwaring/serverless-plugin-test-helper">
    <img src="https://flat.badgen.net/david/dep/manwaring/serverless-plugin-test-helper"></a>
  <a href="https://david-dm.org/manwaring/serverless-plugin-test-helper?type=dev">
    <img src="https://flat.badgen.net/david/dev/manwaring/serverless-plugin-test-helper/?label=dev+dependencies"></a>
  <img height="0" width="0" src="https://b7z7o7y5fi.execute-api.us-east-1.amazonaws.com/v1/readme/visits/github/manwaring/serverless-plugin-test-helper?style=flat-square">
</p>

# Serverless plugin test helper

1. [Overview](#overview)
1. [Installation and setup](#installation-and-setup)
   1. [E2E testing support setup & configuration](#e2e-testing-support-setup--configuration)
   1. [AWS event mocks](#aws-event-mocks)
1. [Examples](#examples)
1. [An opinionated approach to serverless testing](#an-opinionated-approach-to-serverless-testing)

_Feedback is appreciated! If you have an idea for how this plugin can be improved [please open an issue](https://github.com/manwaring/serverless-plugin-test-helper/issues/new)._

# Overview

Running tests on deployed services (vs locally mocked ones) is an important final step in a robust serverless deployment pipeline because it isn't possible to recreate all aspects of a final solution locally - concerns such as fine-grained resource access through IAM and scalability/performance characteristics of the system can only be assessed while the application is running on AWS. Running these tests on stage/branch-specific versions of the application (see [serverless testing best practices below](#serverless-testing-best-practices)) is difficult to do given the dynamic nature of AWS resource naming. This library makes it easier to write post-deployment tests for applications and services written and deployed using the [Serverless Framework](https://serverless.com/framework/) by locally persisting dynamic AWS resource information such as endpoint URLs and exposing them to your tests via easily-imported helper functions.

Because unit tests with mocked AWS services are still an important part of a well-tested service (especially for fast developer feedback), this library also includes helper functions to simplify the creation of mock events for the various AWS Lambda integrations.

# Installation and setup

Install and save the library to `package.json` as a dev dependency:

`npm i --save-dev serverless-plugin-test-helper`

# E2E testing support setup & configuration

This portion of the library includes the following two components.

1. A [Serverless Framework plugin](https://github.com/serverless/plugins) which extends `sls deploy` to save a copy of the generated CloudFormation Stack Output locally.
1. A standard Node.js library which can be imported to access local stack output values in tests (or any other code you want to run post-deployment).

To setup the plugin add the library to the `serverless.yml` plugins section:

```yml
plugins:
  - serverless-plugin-test-helper
```

By default the plugin will generate a file containing stack outputs at `.serverless/stack-output/outputs.yml`, which is where the library pulls values from. You can optionally specify an additional path for storing outputs by using the `serverless.yml` custom section:

```yml
custom:
  testHelper: # This key is used by the plugin to pull in the optional path value
    path: optional/path/for/another/outputs[ .yml | .yaml | .json ]
```

## Using the library to retrieve stack outputs

Import the helper functions into your test files to retrieve values from deployed stack output:

```ts
import { getApiGatewayUrl, getDeploymentBucket, getOutput } from 'serverless-plugin-test-helper';

const URL = getApiGatewayUrl();
const BUCKET_NAME = getDeploymentBucket();
const DOCUMENT_STORAGE_BUCKET_NAME = getOutput('DocumentStorageBucket');
```

- `getApiGatewayUrl()` returns the url of the deployed API Gateway service (if using `http` or `httpApi` as an event type in `serverless.yml`)
- `getDeploymentBucket()` returns the name of the bucket Serverless Framework generates for uploading CloudFormation templates and zipped source code files as part of the `sls deploy` process
- `getOutput('[output key]')` returns the value of the Cloudformation stack output with the specified key\*

\*To see what output values are available for reference you can check the generated `.serverless/stack-output/outputs.yml` file after a deployment. To make additional values available you can specify up to 60 CloudFormation Stack Outputs in `serverless.yml` using the resources > Outputs section:

```yml
resources:
  Outputs:
    # Generic example
    Output1: # This is the key that will be used in the generated outputs file
      Description: This is an optional description that will show up in the CloudFormation dashboard
      Value: { Ref: CloudFormationParameterOrResourceYouWishToExport }

    # Example referencing a custom S3 bucket used for file storage (defined under Resources section below)
    DocumentStorageBucket: # This is the key that will be used in the generated outputs file
      Description: Name of the S3 bucket used for document storage by this stack
      Value: { Ref: DocumentStorageBucket }

  Resources:
    DocumentStorageBucket:
      Type: AWS::S3::Bucket
```

See the [AWS CloudFormation documentation on outputs](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/outputs-section-structure.html) for more information.

# AWS event mocks

Import the helper functions and static objects into your test files to generate AWS event and method signature mocks with optional value overrides. Note that this portion of the library can be used without using the E2E testing module.

```ts
import {
  ApiGatewayEvent,
  ApiGatewayTokenAuthorizerEvent,
  DynamoDBStreamEvent,
  HttpApiEvent,
  SnsEvent,
  context
} from 'serverless-plugin-test-helper';
import { handler } from './lambda-being-tested';

// Setup events with optional value overrides
const event = new ApiGatewayEvent({ body: 'overridden body value' });
const event2 = new ApiGatewayTokenAuthorizerEvent();
const event3 = new DynamoDBStreamEvent();
const event4 = new HttpApiEvent();
const event5 = new SnsEvent();

...

// Invoke the handler functions with events
const result = await handler(event, context);
const result2 = await handler(event2, context);

// TODO write your tests on the results

```

# Examples

There are [three working examples](examples) of how this library can be used in a simple 'hello world' serverless application:

1. [Plugin with optional configurations in a TypeScript project](examples/custom-ts)
1. [Using the default plugin configuration in a TypeScript project](examples/default-ts)
1. [Using the default plugin configuration in a JavaScript project](examples/default-ts)

# Serverless testing best practices

Due to tight coupling with managed services and the difficulty in mocking those same services locally, end-to-end testing is incredibly important for deploying and running serverless applications with confidence. I believe that a good serverless deployment pipeline setup should include the following steps, in order:

## For checkins/merges to master branch\*

1. Install project and dependencies
1. Run unit tests
1. Deploy to a static, non-production environment (using `--stage <environment>` option in Serverless Framework)†
1. Run e2e tests in the static, non-production environment†
1. Optional: include a manual step if want to gate production deploys
1. Deploy to production environment (using `--stage production`)
1. Run e2e tests in production

† Repeat steps 3 and 4 for however many static, non-production environments you have (development, staging, demo, etc.)

## For checkins/merges to a feature branch\*

1. Install project and dependencies
1. Run unit tests
1. Deploy to a dynamic, non-production environment (using `--stage <branch or username>` option in Serverless Framework)
1. Run e2e tests in the dynamic, non-production environment
1. Automate the cleanup of stale ephemeral environments with a solution [like Odin](https://github.com/manwaring/odin)

\* Note that these kinds of pipelines work best using [trunk based development](https://trunkbaseddevelopment.com/)
