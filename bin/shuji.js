#!/usr/bin/env node

/**
 * shuji (周氏)
 * https://github.com/paazmaya/shuji
 *
 * Reverse engineering JavaScript and CSS sources from sourcemaps
 *
 * Copyright (c) Juga Paazmaya <paazmaya@yahoo.com> (https://paazmaya.fi)
 * Licensed under the MIT license
 */

'use strict';

const path = require('path');

const optionator = require('optionator'),
  fs = require('fs-extra');

const shuji = require('../index');

let pkg;

try {
  const packageJson = fs.readFileSync(path.join(__dirname, '..', 'package.json'), 'utf8');
  pkg = JSON.parse(packageJson);
}
catch (error) {
  console.error('Could not read/parse "package.json", quite strange...');
  console.error(error);
  process.exit(1);
}

const optsParser = optionator({
  prepend: `Usage: ${pkg.name} [options] <file|directory>`,
  append: `Version ${pkg.version}`,
  options: [
    {
      option: 'help',
      alias: 'h',
      type: 'Boolean',
      default: false,
      description: 'Help and usage instructions'
    },
    {
      option: 'version',
      alias: 'V',
      type: 'Boolean',
      default: false,
      description: 'Version number'
    },
    {
      option: 'verbose',
      alias: 'v',
      type: 'Boolean',
      default: false,
      description: 'Verbose output, will print which file is currently being processed'
    },
    {
      option: 'output-dir',
      alias: 'o',
      type: 'String',
      default: '.',
      description: 'Output directory'
    },
    {
      option: 'match',
      alias: 'M',
      type: 'String',
      default: '\\.map$',
      description: 'Regular expression for matching and filtering files'
    },
    {
      option: 'recursive',
      alias: 'r',
      type: 'Boolean',
      default: false,
      description: 'Recursively search matching files'
    }
  ]
});

let opts;

try {
  opts = optsParser.parse(process.argv);
}
catch (error) {
  console.error(error.message);
  process.exit(1);
}

if (opts.version) {
  console.log((opts.verbose ?
    pkg.name + ' v' :
    '') + pkg.version);
  process.exit();
}

console.log(`${pkg.name} - ${pkg.description}`);

if (opts.help || opts._.length === 0) {
  console.log(optsParser.generateHelp());
  process.exit();
}

// List of files that will be processed
const fileList = [];

// Expression to match file paths against
const matcher = new RegExp(opts.match, 'u');

/**
 * Determine if the given existing filepath is a file or directory
 * and continue with filtering and recursive when needed.
 *
 * @param {string} filepath Relative filepath that exists
 * @param {bool} recurse Should a directory be entered
 * @returns {void}
 */
const handleFilepath = (filepath, recurse) => {
  const stat = fs.statSync(filepath);
  if (stat.isDirectory() && recurse) {
    const list = fs.readdirSync(filepath);

    list.forEach((item) => {
      handleFilepath(path.join(filepath, item), opts.recursive);
    });
  }
  else if (filepath.match(matcher) && stat.isFile()) {
    fileList.push(filepath);
  }
};

opts._.forEach((item) => {
  if (!fs.existsSync(item)) {
    console.error(`File (${item}) not found`);
  }
  else {
    // It is ok to enter the directory on the first level
    handleFilepath(item, true);
  }
});

if (opts.verbose) {
  console.log(`Going to process total of ${fileList.length} files`);
}

const outputDir = path.resolve(opts.outputDir);

if (opts.verbose) {
  console.log(`Outputting to directory: ${outputDir}`);
}

if (!fs.existsSync(outputDir)) {
  fs.ensureDirSync(outputDir);
}

// Process then...
fileList.forEach(async (filepath) => {
  if (opts.verbose) {
    console.log(`Processing file ${filepath}`);
  }

  const outdir = path.join(outputDir, path.dirname(filepath));

  const input = fs.readFileSync(filepath, 'utf8');
  const output = await shuji(input, {
      verbose: typeof opts.verbose === 'boolean' ?
        opts.verbose :
        false
    });

  fs.ensureDirSync(outdir);

  const sourceFiles = Object.entries(output);

  if (!sourceFiles.length) {
    console.error('Could not reverse sourcemap');
  }

  sourceFiles.forEach(([filename, content]) => {
    const filepath = path.join(outdir, filename);

    if (opts.verbose) {
      console.log(`Writing to file ${filepath}`);
    }

    if (fs.existsSync(filepath)) {
      console.error('File existed, skipping!');
    }
    else {
      fs.writeFileSync(filepath, content, 'utf8');
    }
  });

});
