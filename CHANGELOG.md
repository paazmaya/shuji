# Version history for shuji (周氏)

This changelog covers the version history and possible upcoming changes.
It follows the guidance from https://keepachangelog.com/en/1.0.0/.

## Unreleased

- Minimum supported Node.js version lifted from `14.15.0` to `24.12.0`

## `v0.8.0` (2023-12-04)

- New option `--preserve` by @rodrigograca31 via #39. Thank you!
- Minimum supported Node.js version lifted from `10.13.0` to `14.15.0`
- Converted to ESM (EcmaScript Modules) syntax
- Using `c8` to gather unit test coverage information, instead of `nyc`
- Dependencies up to date

## `v0.7.0` (2021-02-16)

- Minimum Node.js version lifted from `8.11.1` to `10.13.0`
- Run tests also against Node.js version 14. Now versions 10 (Travis), 12 (AppVeyor), and 14 (GitHub Actions) of Node.js are covered

## `v0.6.1` (2019-09-13)

- Dependency update and better unit test coverage

## `v0.6.0` (2019-05-27)

- Removed the option for directory recursion, it is now always a recursive operation
- Support for reading inline source maps, from JavaScript and CSS files
- Use [`npm-shrinkwrap.json`](https://docs.npmjs.com/files/shrinkwrap.json) for locking the working set of 3rd party dependencies

## `v0.5.1` (2019-05-21)

- Updated dependencies in order to remove possible security vulnerabilities

## `v0.5.0` (2018-10-24)

- Minimum Node.js version lifted from `6.9.5` to `8.11.1`
- Ignoring parts in the filename after `?`

## `v0.4.0` (2017-08-10)

- Minimum Node.js version lifted from `4.2.0` to `6.9.5`
- Configure code coverage reporting to correctly validate unit test coverage, via `--exclude` configuration
- Dependencies are once again up to date :neckbeard:

## `v0.3.1` (2016-08-08)

- Test also in Windows, at [AppVeyor](https://ci.appveyor.com/project/paazmaya/shuji)

## `v0.3.0` (2016-07-07)

- Start using shared ESLint configuration #1
- Test against Node.js v6

## `v0.2.0` (2016-03-14)

- Do not overwrite existing files, instead skip them

## `v0.1.0` (2016-02-12)

- Initial release which can make it happen
