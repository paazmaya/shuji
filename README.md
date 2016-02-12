# shuji (周氏)

> Reverse engineering JavaScript and CSS sources from sourcemaps


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
shuji [options] <file|directory>

  -h, --help               Help and usage instructions
  -V, --version            Version number
  -v, --verbose            Verbose output, will print which file is currently being processed
  -o, --output-dir String  Output directory - default: .
  -M, --match String       Regular expression for matching and filtering files - default: \.map$
  -r, --recursive          Recursively search matching files

Version 0.1.0
```

## Version history

* `v0.1.0` (2016-02-12)
    - Initial release which can make it happen

## License

Copyright (c) [Juga Paazmaya](http://www.paazmaya.fi) <paazmaya@yahoo.com>

Licensed under [the MIT license](./LICENSE).
