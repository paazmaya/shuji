# shuji (周氏)

> Reverse engineering JavaScript and CSS sources from sourcemaps

[![Build Status](https://travis-ci.org/paazmaya/shuji.svg?branch=master)](https://travis-ci.org/paazmaya/shuji)
[![codecov.io](https://codecov.io/github/paazmaya/shuji/coverage.svg?branch=master)](https://codecov.io/github/paazmaya/shuji?branch=master)
[![Dependency Status](https://gemnasium.com/paazmaya/shuji.svg)](https://gemnasium.com/paazmaya/shuji)

## Getting started

Install the `shuji` command line utility globally with [npm](https://www.npmjs.com/).
Elevated privileges might be needed via `sudo`, depending on the platform. In most cases just:

```sh
npm install --global shuji
```

Please note that this tool requires the minimum [Node.js](https://nodejs.org/en/)
version to be `4.2.0`, which is the Long Term Support (LTS) version.


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

Version 0.2.0
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


## Version history

* `v0.2.0` (2016-03-14)
    - Do not overwrite existing files, instead skip them
* `v0.1.0` (2016-02-12)
    - Initial release which can make it happen

## License

Copyright (c) [Juga Paazmaya](http://paazmaya.fi) <paazmaya@yahoo.com>

Licensed under [the MIT license](./LICENSE).
