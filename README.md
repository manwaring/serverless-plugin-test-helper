<p align="center">
  <img height="150" src="https://avatars0.githubusercontent.com/u/36457275?s=400&u=16d355f384ed7f8e0655b7ed1d70ff2e411690d8&v=4e">
  <img height="150" src="https://user-images.githubusercontent.com/2955468/50581158-0b705200-0e25-11e9-9fd5-0fe422e00f2e.png">
</p>

[![version][version]][version-url] [![downloads][downloads]][downloads-url] [![coverage][coverage]][coverage-url] [![license][license]][license-url]

[![Build][build]][build-url] [![dependabot][dependabot]][dependabot-url] [![dependencies][dependency]][dependency-url] [![dev dependencies][dev-dependency]][dev-dependency-url]

# Serverless plugin test helper

1. [Library overview](#library-overview)
1. [Installation and setup](#installation-and-setup)
1. [An opinionated approach to serverless testing](#an-opinionated-approach-to-serverless-testing)

## Library overview

This library helps out with end-to-end testing of applications and services deployed using the [Serverless Framework](https://serverless.com/framework/) by locally persisting and exposing dynamic AWS resource information such as endpoint URLs.

The library has two parts:

1. A Serverless Framework plugin which extends `sls deploy` to save a local copy of the generated CloudFormation Stack output (which includes service information such as endpoint URLs)
1. A standard Nodejs library which can be imported to access the output values in tests

## Installation and setup

Install and save to `package.json` as a dev dependency:

`npm i -D serverless-plugin-test-helper`

Register the plugin in `serverless.yml` plugins section to save the stack output:

```yml
plugins:
  - serverless-plugin-test-helper
```

Import the helper functions into your test files for getting values from the stack output:

```ts
import { getDeployedUrl } from 'serverless-plugin-test-helper';
const URL = getDeployedUrl();
```

## An opinionated approach to serverless testing

Due to tight coupling with managed services and the difficulty in mocking those same services locally, end-to-end testing is incredibly important for deploying serverless applications with confidence (citations needed). Given the dynamic nature of cloud service names and arns it can be difficult to setup a fully-automated test suite, increasing the barrier to entry for clean end-to-end tests. A good deployment pipeline setup should include the following steps, in order:
TODO: trunk based development, account separation, Odin

For checkins/merges to master branch:

1. Install project and dependencies
1. Run unit tests
1. Deploy to a static environment (using `--stage <environment>` option in Serverless Framework)
1. Run e2e tests on the environment
   ... repeat for all static, non-prod environments
   ... include a manual step if want to gate production deploys
1. Deploy to production environment (using `--stage production`)
1. Run e2e tests in production

For checkins/merges to a feature branch:

1. Install project and dependencies
1. Run unit tests
1. Deploy to a dynamic environment (using `--stage <branch or username>` option in Serverless Framework)
1. Run e2e tests on dynamic environment

This library supports this kind of pipeline testing approach by saving AWS service configurations from CloudFormation Stack output to a local file after the serverless deployment (`sls deploy`) so that the values can be referenced in later steps for calling those deployed resources.
TODO link to circleci config as an example
TODO sample hello world project in the repo?

<!-- Badge icons -->

[version]: https://badgen.net/npm/v/serverless-plugin-test-helper?icon=npm&label=npm@latest
[downloads]: https://badgen.net/npm/dt/serverless-plugin-test-helper?icon=npm
[coverage]: https://badgen.net/codecov/c/github/manwaring/serverless-plugin-test-helper/?icon=codecov
[license]: https://badgen.net/npm/license/serverless-plugin-test-helper/
[language]: https://badgen.net/badge/typescript/typescript/?icon&label
[style]: https://badgen.net/badge/code%20style/prettier?color=purple&icon=terminal&label
[build]: https://badgen.net/circleci/github/manwaring/serverless-plugin-test-helper/master?icon=circleci
[dependabot]: https://badgen.net/dependabot/manwaring/serverless-plugin-test-helper/?icon=dependabot&label=dependabot
[dependency]: https://badgen.net/david/dep/manwaring/serverless-plugin-test-helper
[dev-dependency]: https://badgen.net/david/dev/manwaring/serverless-plugin-test-helper/?label=dev+dependencies

<!-- Badge URLs -->

[version-url]: https://npmjs.com/package/serverless-plugin-test-helper
[downloads-url]: https://www.npmjs.com/package/serverless-plugin-test-helper
[coverage-url]: https://codecov.io/gh/manwaring/serverless-plugin-test-helper
[license-url]: https://www.npmjs.com/package/serverless-plugin-test-helper
[build-url]: https://circleci.com/gh/manwaring/serverless-plugin-test-helper
[dependabot-url]: https://badgen.net/dependabot/manwaring/serverless-plugin-test-helper
[dependency-url]: https://david-dm.org/manwaring/serverless-plugin-test-helper
[dev-dependency-url]: https://david-dm.org/manwaring/serverless-plugin-test-helper?type=dev
