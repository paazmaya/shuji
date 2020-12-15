/**
 * shuji (周氏)
 * https://github.com/paazmaya/shuji
 *
 * Reverse engineering JavaScript and CSS sources from sourcemaps
 *
 * Copyright (c) Juga Paazmaya <paazmaya@yahoo.com> (https://paazmaya.fi)
 * Licensed under the MIT license
 */


const fs = require('fs'),
  path = require('path'),
  execFile = require('child_process').execFile;

const tape = require('tape');

const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.json'), 'utf8'));

tape('cli should output version number', (test) => {
  test.plan(1);

  execFile('node', [pkg.bin, '-V'], null, (error, stdout) => {
    if (error) {
      test.fail(error);
    }
    test.equals(stdout.trim(), pkg.version, 'Version is the same as in package.json');
  });

});

tape('cli should output help by default', (test) => {
  test.plan(1);

  execFile('node', [pkg.bin], null, (error, stdout) => {
    if (error) {
      test.fail(error);
    }
    test.ok(stdout.trim().indexOf('shuji [options] <file|directory>') !== -1, 'Help appeared');
  });

});

tape('cli should output help when requested', (test) => {
  test.plan(1);

  execFile('node', [pkg.bin, '--help'], null, (error, stdout) => {
    if (error) {
      test.fail(error);
    }
    test.ok(stdout.trim().indexOf('shuji [options] <file|directory>') !== -1, 'Help appeared');
  });

});

tape('cli should create folder for output', (test) => {
  test.plan(1);

  execFile('node', [pkg.bin, '-o', 'tmp/out', 'tests/fixtures', '-v', '-M', '.js'], null, (error, stdout) => {
    if (error) {
      test.fail(error);
    }
    test.ok(fs.existsSync('tmp/out'), 'Temporary out folder exists');
    // console.log(stdout);
  });

});

tape('cli should accept single JS file', (test) => {
  test.plan(3);

  execFile('node', [pkg.bin, '-v', '-M', '.js', '-o', 'tmp/command', 'tests/fixtures/stretchy-inline-sources.min.js'], null, (error, stdout) => {
    if (error) {
      test.fail(error);
    }
    test.ok(fs.existsSync('tmp/command'), 'Temporary out folder exists');
    test.ok(fs.existsSync('tmp/command/tests'), 'Temporary out folder exists');
    test.ok(fs.existsSync('tmp/command/tests/fixtures'), 'Temporary out folder exists');
  });

});

tape('cli should read match argument', (test) => {
  test.plan(1);

  execFile('node', [pkg.bin, '-o', 'tmp/inline', '-v', '--match', '\\\.min\\\.js$', 'tests/fixtures'], null, (error, stdout) => {
    if (error) {
      test.fail(error);
    }
    test.ok(fs.existsSync('tmp/inline'), 'Temporary inline folder exists');
    // console.log(stdout);
  });

});

tape('cli should preserve folder structure', (test) => {
  test.plan(4);

  execFile('node', [pkg.bin, '-o', 'tmp/preserve-folder-structure', '-v', 'tests/fixtures/preserve-folder-structure.min.js.map', '--preserve'], null, (error, stdout) => {
    if (error) {
      test.fail(error);
    }
    test.ok(fs.existsSync('tmp/preserve-folder-structure'), 'Temporary preserve-folder-structure folder exists');
    test.ok(fs.existsSync('tmp/preserve-folder-structure/tests/fixtures/webpack:/my-webpack-project/classes'), 'Temporary classes folder exists');
    test.ok(fs.existsSync('tmp/preserve-folder-structure/tests/fixtures/webpack:/my-webpack-project/classes/person.js'), 'Temporary person.js exists');
    test.ok(fs.existsSync('tmp/preserve-folder-structure/tests/fixtures/webpack:/my-webpack-project/index.js'), 'Temporary index.js exists');
    // console.log(stdout);
  });

});
