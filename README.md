# shuji (周氏)

> Reverse engineering JavaScript and CSS sources from sourcemaps

[![Build Status](https://app.travis-ci.com/paazmaya/shuji.svg?branch=master)](https://app.travis-ci.com/paazmaya/shuji)
[![Windows build status](https://ci.appveyor.com/api/projects/status/pfplexeaehjvwel3/branch/master?svg=true)](https://ci.appveyor.com/project/paazmaya/shuji/branch/master)
[![Node.js v20 CI](https://github.com/paazmaya/shuji/actions/workflows/linting-and-unit-testing.yml/badge.svg)](https://github.com/paazmaya/shuji/actions/workflows/linting-and-unit-testing.yml)
[![codecov](https://codecov.io/gh/paazmaya/shuji/branch/master/graph/badge.svg)](https://codecov.io/gh/paazmaya/shuji)
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

Please note that the minimum supported version of [Node.js](https://nodejs.org/en/) is `14.15.0`, which is [the active Long Term Support (LTS) version](https://github.com/nodejs/Release#release-schedule).

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

Version 0.8.0
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

[Changes happening across different versions and upcoming changes are tracked in the `CHANGELOG.md` file.](CHANGELOG.md)

## License

Copyright (c) [Juga Paazmaya](https://paazmaya.fi) <paazmaya@yahoo.com>

Licensed under [the MIT license](./LICENSE).

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fpaazmaya%2Fshuji.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fpaazmaya%2Fshuji?ref=badge_large)
