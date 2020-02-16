/**
 * shuji (周氏)
 * https://github.com/paazmaya/shuji
 *
 * Reverse engineering JavaScript and CSS sources from sourcemaps
 *
 * Copyright (c) Juga Paazmaya <paazmaya@yahoo.com> (https://paazmaya.fi)
 * Licensed under the MIT license
 */


const tape = require('tape');

const findFiles = require('../../lib/find-files');

tape('findFiles - got few map files', (test) => {
  test.plan(1);

  const output = findFiles('tests/fixtures', /\.map$/);

  test.equal(output.length, 4);
});

tape('findFiles - got two .min.js files', (test) => {
  test.plan(1);

  const output = findFiles('tests/fixtures', /\.min\.js$/);

  test.equal(output.length, 2);
});

tape('findFiles - not even existing', (test) => {
  test.plan(1);

  const output = findFiles('not even existing', /.*/);

  test.equal(output.length, 0);
});
