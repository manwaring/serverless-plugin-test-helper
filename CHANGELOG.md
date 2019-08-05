# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html)

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

[1.1.2]: https://github.com/manwaring/serverless-plugin-test-helper/compare/v1.1.1...v1.1.2
[1.1.1]: https://github.com/manwaring/serverless-plugin-test-helper/compare/v1.1.0...v1.1.1
[1.1.0]: https://github.com/manwaring/serverless-plugin-test-helper/compare/v1.0.0...v1.1.0
