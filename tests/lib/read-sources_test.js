/**
 * shuji (周氏)
 * https://github.com/paazmaya/shuji
 *
 * Reverse engineering JavaScript and CSS sources from sourcemaps
 *
 * Copyright (c) Juga Paazmaya <paazmaya@yahoo.com> (https://paazmaya.fi)
 * Licensed under the MIT license
 */

const fs = require('fs');

const tape = require('tape');

const readSources = require('../../lib/read-sources');

tape('readSources - nothing', (test) => {
  test.plan(1);

  const input = fs.readFileSync('tests/fixtures/stretchy-inline.css.map', 'utf8');
  const options = {
    verbose: true
  };

  const output = readSources(input, options);

  test.deepEqual(Object.keys(output), []);
});

tape('readSources - something', (test) => {
  test.plan(1);

  const input = fs.readFileSync('tests/fixtures/stretchy-with-sources.min.js.map', 'utf8');
  const options = {
    verbose: true
  };

  const output = readSources(input, options);

  test.deepEqual(Object.keys(output), []);
});
