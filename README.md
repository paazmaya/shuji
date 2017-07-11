# shuji (周氏)

> Reverse engineering JavaScript and CSS sources from sourcemaps

[![Build Status](https://travis-ci.org/paazmaya/shuji.svg?branch=master)](https://travis-ci.org/paazmaya/shuji)
[![Windows build status](https://ci.appveyor.com/api/projects/status/pfplexeaehjvwel3/branch/master?svg=true)](https://ci.appveyor.com/project/paazmaya/shuji/branch/master)
[![codecov](https://codecov.io/gh/paazmaya/shuji/branch/master/graph/badge.svg)](https://codecov.io/gh/paazmaya/shuji)
[![Dependency Status](https://gemnasium.com/paazmaya/shuji.svg)](https://gemnasium.com/paazmaya/shuji)

## Background for the name

The name of the project is for honouring the legacy of a certain master from the Ryukyu archipelago who contributed to the martial arts that we today know as **karate** and **ryukyu kobujutsu**.

## Getting started

Install the `shuji` command line utility globally with [npm](https://www.npmjs.com/).
Elevated privileges might be needed via `sudo`, depending on the platform. In most cases just:

```sh
npm install --global shuji
```

Please note that this tool requires the minimum [Node.js](https://nodejs.org/en/)
version to be `6.9.5`, which is the Long Term Support (LTS) version.

## Command line options

The output of `shuji --help` pretty much covers all the options:

```sh
shuji - Reverse engineering JavaScript and CSS sources from sourcemaps
Usage: shuji [options] <file|directory>

  -h, --help               Help and usage instructions
  -V, --version            Version number
  -v, --verbose            Verbose output, will print which file is currently being processed
  -o, --output-dir String  Output directory - default: .
  -M, --match String       Regular expression for matching and filtering files - default: \.map$
  -r, --recursive          Recursively search matching files

Version 0.3.0
```

## Testing

Test files are generated with [UglifyJS2](https://github.com/mishoo/UglifyJS2) and
[`sass`](http://sass-lang.com)
by using files from the [stretchy](https://github.com/LeaVerou/stretchy) project,
with the following commands:

```sh
uglifyjs stretchy.js --compress --mangle \
 -o stretchy.min.js --source-map stretchy.min.js.map

uglifyjs stretchy.js --compress --mangle \
 -o stretchy.min.js --source-map stretchy-with-sources.min.js.map \
 --source-map-include-sources

sass stretchy.scss:stretchy.css

sass stretchy.scss:stretchy.css --sourcemap=inline
```

Unit tests are written with [`tape`](https://github.com/substack/tape) and can be executed with `npm test`.
Code coverage is inspected with [`nyc`](https://github.com/istanbuljs/nyc) and
can be executed with `npm run coverage` after running `npm test`.
Please make sure it is over 90% at all times.

## Contributing

["A Beginner's Guide to Open Source: The Best Advice for Making your First Contribution"](http://hf.heidilabs.com/blog/a-beginners-guide-to-open-source-making-your-first-contribution).

[Also there is a blog post about "45 Github Issues Dos and Don’ts"](https://davidwalsh.name/45-github-issues-dos-donts).

Linting is done with [ESLint](http://eslint.org) and can be executed with `npm run lint`.
There should be no errors appearing after any JavaScript file changes.

Please note that any features or changed will not be merged without working unit tests.

## Version history

* `v0.4.0` (2017-07)
  - Minimum Node.js version lifted from `4.2.0` to `6.9.5`
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
