# shuji (周氏)

> Reverse engineering JavaScript and CSS sources from sourcemaps

[![Build Status](https://travis-ci.org/paazmaya/shuji.svg?branch=master)](https://travis-ci.org/paazmaya/shuji)
[![Windows build status](https://ci.appveyor.com/api/projects/status/pfplexeaehjvwel3/branch/master?svg=true)](https://ci.appveyor.com/project/paazmaya/shuji/branch/master)
[![codecov](https://codecov.io/gh/paazmaya/shuji/branch/master/graph/badge.svg)](https://codecov.io/gh/paazmaya/shuji)
[![dependencies Status](https://david-dm.org/paazmaya/shuji/status.svg)](https://david-dm.org/paazmaya/shuji)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fpaazmaya%2Fshuji.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fpaazmaya%2Fshuji?ref=badge_shield)

## Background for the name

The name of the project is for honouring the legacy of a certain master from the Ryukyu archipelago who contributed to the martial arts that we today know as **karate** and **ryukyu kobujutsu**.

## Getting started

Install the `shuji` command line utility globally with [npm](https://www.npmjs.com/).
Elevated privileges might be needed via `sudo`, depending on the platform. In most cases just:

```sh
npm install --global shuji
```

Usage example:

```sh
shuji file.js.map -o folder
```

Please note that the minimum supported version of [Node.js](https://nodejs.org/en/) is `10.13.0`, which is [the active Long Term Support (LTS) version](https://github.com/nodejs/Release#release-schedule).

## Command line options

The output of `shuji --help` pretty much covers all the options:

```sh
shuji - Reverse engineering JavaScript and CSS sources from sourcemaps
Usage: shuji [options] <file|directory>

  -h, --help               Help and usage instructions
  -o, --output-dir String  Output directory - default: .
  -p, --preserve           Preserve sourcemap's original folder structure.
  -M, --match String       Regular expression for matching and filtering files -
                           default: \.map$
  -v, --verbose            Verbose output, will print which file is currently being
                           processed
  -V, --version            Version number

Version 0.6.1
```

## Testing

Test files are generated with [UglifyJS 3](https://www.npmjs.com/package/uglify-js) and
[`sass`](https://sass-lang.com/install)
by using files from the [stretchy](https://github.com/LeaVerou/stretchy) project,
with the following commands:

```sh
uglifyjs stretchy.js --compress --mangle \
 --output stretchy.min.js --source-map includeSources
mv stretchy.min.js.map stretchy-with-sources.min.js.map

uglifyjs stretchy.js --compress --mangle \
 --output stretchy.min.js --source-map "url=inline"
mv stretchy.min.js stretchy-inline-sources.min.js

uglifyjs stretchy.js --compress --mangle \
 --output stretchy.min.js --source-map "url=stretchy.min.js.map"

sass stretchy.scss:stretchy.css

sass stretchy.scss:stretchy-inline.css --embed-source-map
```

Unit tests are written with [`tape`](https://github.com/substack/tape) and can be executed with `npm test`.
Code coverage is inspected with [`nyc`](https://github.com/istanbuljs/nyc) and
can be executed with `npm run coverage` after running `npm test`.
Please make sure it is over 90% at all times.

## Contributing

["A Beginner's Guide to Open Source: The Best Advice for Making your First Contribution"](http://www.erikaheidi.com/blog/a-beginners-guide-to-open-source-the-best-advice-for-making-your-first-contribution/).

[Also there is a blog post about "45 Github Issues Dos and Don’ts"](https://davidwalsh.name/45-github-issues-dos-donts).

Linting is done with [ESLint](http://eslint.org) and can be executed with `npm run lint`.
There should be no errors appearing after any JavaScript file changes.

Please note that any features or changed will not be merged without working unit tests.

## Version history

* `v0.7.0` (2021-02-16)
  - Minimum Node.js version lifted from `8.11.1` to `10.13.0`
  - Run tests also against Node.js version 14. Now versions 10 (Travis), 12 (AppVeyor), and 14 (GitHub Actions) of Node.js are covered
* `v0.6.1` (2019-09-13)
  - Dependency update and better unit test coverage
* `v0.6.0` (2019-05-27)
  - Removed the option for directory recursion, it is now always a recursive operation
  - Support for reading inline source maps, from JavaScript and CSS files
  - Use [`npm-shrinkwrap.json`](https://docs.npmjs.com/files/shrinkwrap.json) for locking the working set of 3rd party dependencies
* `v0.5.1` (2019-05-21)
  - Updated dependencies in order to remove possible security vulnerabilities
* `v0.5.0` (2018-10-24)
  - Minimum Node.js version lifted from `6.9.5` to `8.11.1`
  - Ignoring parts in the filename after `?`
* `v0.4.0` (2017-08-10)
  - Minimum Node.js version lifted from `4.2.0` to `6.9.5`
  - Configure code coverage reporting to correctly validate unit test coverage, via `--exclude` configuration
  - Dependencies are once again up to date :neckbeard:
* `v0.3.1` (2016-08-08)
  - Test also in Windows, at [AppVeyor](https://ci.appveyor.com/project/paazmaya/shuji)
* `v0.3.0` (2016-07-07)
  - Start using shared ESLint configuration #1
  - Test against Node.js v6
* `v0.2.0` (2016-03-14)
  - Do not overwrite existing files, instead skip them
* `v0.1.0` (2016-02-12)
  - Initial release which can make it happen

## License

Copyright (c) [Juga Paazmaya](https://paazmaya.fi) <paazmaya@yahoo.com>

Licensed under [the MIT license](./LICENSE).


[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fpaazmaya%2Fshuji.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fpaazmaya%2Fshuji?ref=badge_large)
