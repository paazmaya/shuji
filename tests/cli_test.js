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

const fs = require('fs'),
  path = require('path'),
  execFile = require('child_process').execFile;

const tape = require('tape');

const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.json'), 'utf8'));

tape('cli should output version number', (test) => {
  test.plan(1);

  execFile('node', [pkg.bin, '-V'], null, (err, stdout) => {
    test.equals(stdout.trim(), pkg.version, 'Version is the same as in package.json');
  });

});

tape('cli should output help by default', (test) => {
  test.plan(1);

  execFile('node', [pkg.bin], null, (err, stdout) => {
    test.ok(stdout.trim().indexOf('shuji [options] <file|directory>') !== -1, 'Help appeared');
  });

});

tape('cli should output help when requested', (test) => {
  test.plan(1);

  execFile('node', [pkg.bin, '--help'], null, (err, stdout) => {
    test.ok(stdout.trim().indexOf('shuji [options] <file|directory>') !== -1, 'Help appeared');
  });

});

tape('cli should create folder for output', (test) => {
  test.plan(1);

  execFile('node', [pkg.bin, '-o', 'tmp/out', 'tests/fixtures'], null, (err, stdout) => {
    test.ok(fs.existsSync('tmp/out'), 'Temporary out folder exists');
    console.log(stdout);
  });

});

tape('cli should read match argument', (test) => {
  test.plan(1);

  execFile('node', [pkg.bin, '-o', 'tmp/inline', '-v', '--match', '\\\.min\\\.js$', 'tests/fixtures'], null, (err, stdout) => {
    test.ok(fs.existsSync('tmp/inline'), 'Temporary inline folder exists');
    console.log(stdout);
  });

});
