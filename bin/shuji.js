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

const shuji = require('../index'),
  findFiles = require('../lib/find-files'),
  findMap = require('../lib/find-map');

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

// Expression to match file paths against
const MATCH_FILE = new RegExp(opts.match, 'u');
let fileList = [];

opts._.forEach((item) => {
  if (!fs.existsSync(item)) {
    console.error(`Error: File "${item}" not found`);
  }
  else {
    // List of files that will be processed
    fileList = fileList.concat(findFiles(item, MATCH_FILE));
  }
});

if (opts.verbose) {
  console.log(`Going to process total of ${fileList.length} files`);
}

if (!fileList.length) {
  console.error('Error: No valid input files given');

  return;
}

const outputDir = path.resolve(opts.outputDir);

if (opts.verbose) {
  console.log(`Outputting to directory "${outputDir}"`);
}

if (!fs.existsSync(outputDir)) {
  fs.ensureDirSync(outputDir);
}

// Process then...
fileList.forEach(async (inputFilepath) => {
  if (opts.verbose) {
    console.log(`Processing file "${inputFilepath}"`);
  }

  const outdir = path.join(outputDir, path.dirname(inputFilepath));
  const input = findMap(inputFilepath);

  //console.log(input);
  const output = await shuji(input, {
    verbose: typeof opts.verbose === 'boolean' ?
      opts.verbose :
      false
  });

  fs.ensureDirSync(outdir);

  const sourceFiles = Object.entries(output);

  if (!sourceFiles.length) {
    console.error(`Error: Could not reverse sourcemap for file ${inputFilepath}`);
  }

  sourceFiles.forEach(([filename, content]) => {
    filename = filename.replace(/(\?\S+)/u, '');
    const outputFilepath = path.join(outdir, filename);

    if (opts.verbose) {
      console.log(`Writing to file ${outputFilepath}`);
    }

    if (fs.existsSync(outputFilepath)) {
      console.error(`Warning: File ${outputFilepath} already exists, skipping!`);
    }
    else {
      fs.writeFileSync(outputFilepath, content, 'utf8');
    }
  });

});
