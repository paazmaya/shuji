/**
 * shuji (周氏)
 * https://github.com/paazmaya/shuji
 *
 * Reverse engineering JavaScript and CSS sources from sourcemaps
 *
 * Copyright (c) Juga Paazmaya <paazmaya@yahoo.com> (https://paazmaya.fi)
 * Licensed under the MIT license
 */

import tape from 'tape';

import findFiles from '../../lib/find-files.js';

tape('findFiles - got few map files', (test) => {
  test.plan(1);

  const output = findFiles('tests/fixtures', /\.map$/);

  test.equal(output.length, 6);
});

tape('findFiles - got two .min.js files', (test) => {
  test.plan(1);

  const output = findFiles('tests/fixtures', /\.min\.js$/);

  test.equal(output.length, 3);
});

tape('findFiles - not even existing', (test) => {
  test.plan(1);

  const output = findFiles('not even existing', /.*/);

  test.equal(output.length, 0);
});
