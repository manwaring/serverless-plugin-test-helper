# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html)

## [2.1.2]&nbsp;&nbsp;(2020-02-11)

### Changed

- Add better example source arn to dynamodb stream mock event

## [2.1.1]&nbsp;&nbsp;(2020-02-11)

### Changed

- Update libraries

## [2.1.0]&nbsp;&nbsp;(2020-02-11)

### Changed

- Updated DynamoDBStream event mock default to only include a single record

## [2.0.2]&nbsp;&nbsp;(2020-01-24)

### Added

- Added mock event generator for API Gateway custom authorizer, CloudFormation custom resource, and SNS

### Changed

- Updated documentation to include event mocks

## [2.0.1]&nbsp;&nbsp;(2020-01-23)

### Added

- Added a mock event generator for DynamoDB Stream event

## [2.0.0]&nbsp;&nbsp;(2020-01-22)

### Added

- Added a default callback object in addition to the context object already specified
- Added the first mock event generator for AWS Lambda triggers (ApiGateway event)

### Changed

- Updated the name of method 'getDeployedUrl()' to 'getApiGatewayUrl()' for additional clarity
- Switched tests from Cucumber to Jest

### Fixed

- Added missing 'getOutput' method to library

## [1.3.1]&nbsp;&nbsp;(2019-10-15)

### Fixed

- Added missing 'getOutput' method to library

## [1.3.0]&nbsp;&nbsp;(2019-09-30)

### Added

- Mock context for passing to Lambda handlers in unit tests

### Changed

- Switched from Cucumber to Jest

## [1.2.2]&nbsp;&nbsp;(2019-09-06)

### Changed

- Remove console.log unless DEBUG environment variable is set

## [1.2.1]&nbsp;&nbsp;(2019-08-24)

### Changed

- Update dependencies to latest versions

## [1.2.0]&nbsp;&nbsp;(2019-08-12)

### Changed

- Update yaml file writing to use a max line length of 240 instead of 80 to avoid line chomps

## [1.1.3]&nbsp;&nbsp;(2019-08-09)

### Fixed

- Test example script to `cd` into correct directories

## [1.1.2]&nbsp;&nbsp;(2019-08-05)

### Fixed

- A bug where the file fails to write if the target path is in the current directory

## [1.1.1]&nbsp;&nbsp;(2019-08-04)

### Fixed

- A bug where the plugin failed to initialize with a missing custom section in project's serverless.yml

### Added

- Working examples using the library with default and custom settings

### Changed

- Update CircleCI config to execute examples with latest package version after a successful npm publish

## [1.1.0]&nbsp;&nbsp;(2019-08-04)

### Added

- Two new methods for getting output values (getDeploymentBucket() and getOutput(key))
- This CHANGELOG to track project changes over time

### Changed

- Clarify project intent and provide additional examples in README
- Publish now happens from git tags instead of master merges

[2.0.2]: https://github.com/manwaring/serverless-plugin-test-helper/compare/v2.0.1...v2.0.2
[2.0.1]: https://github.com/manwaring/serverless-plugin-test-helper/compare/v2.0.0...v2.0.1
[2.0.0]: https://github.com/manwaring/serverless-plugin-test-helper/compare/v1.3.1...v2.0.0
[1.3.1]: https://github.com/manwaring/serverless-plugin-test-helper/compare/v1.3.0...v1.3.1
[1.3.0]: https://github.com/manwaring/serverless-plugin-test-helper/compare/v1.2.2...v1.3.0
[1.2.2]: https://github.com/manwaring/serverless-plugin-test-helper/compare/v1.2.1...v1.2.2
[1.2.1]: https://github.com/manwaring/serverless-plugin-test-helper/compare/v1.2.0...v1.2.1
[1.2.0]: https://github.com/manwaring/serverless-plugin-test-helper/compare/v1.1.3...v1.2.0
[1.1.3]: https://github.com/manwaring/serverless-plugin-test-helper/compare/v1.1.2...v1.1.3
[1.1.2]: https://github.com/manwaring/serverless-plugin-test-helper/compare/v1.1.1...v1.1.2
[1.1.1]: https://github.com/manwaring/serverless-plugin-test-helper/compare/v1.1.0...v1.1.1
[1.1.0]: https://github.com/manwaring/serverless-plugin-test-helper/compare/v1.0.0...v1.1.0
