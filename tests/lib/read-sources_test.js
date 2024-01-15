/**
 * shuji (周氏)
 * https://github.com/paazmaya/shuji
 *
 * Reverse engineering JavaScript and CSS sources from sourcemaps
 *
 * Copyright (c) Juga Paazmaya <paazmaya@yahoo.com> (https://paazmaya.fi)
 * Licensed under the MIT license
 */

import fs from 'node:fs';

import tape from 'tape';

import readSources from '../../lib/read-sources.js';

tape('readSources - nothing', async (test) => {
  test.plan(1);

  const input = fs.readFileSync('tests/fixtures/stretchy-inline.css.map', 'utf8');
  const options = {
    verbose: true
  };

  const output = await readSources(input, options);

  test.deepEqual(Object.keys(output), ['stretchy.scss', '_svg.scss']);
});

tape('readSources - something', async (test) => {
  test.plan(1);

  const input = fs.readFileSync('tests/fixtures/stretchy-with-sources.min.js.map', 'utf8');
  const options = {
    verbose: true
  };

  const output = await readSources(input, options);

  test.deepEqual(Object.keys(output), ['stretchy.js']);
});
