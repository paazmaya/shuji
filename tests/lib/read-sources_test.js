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

const tape = require('tape');

const readSources = require('../../lib/read-sources');

tape('readSources - got few map files', (test) => {
  test.plan(1);

  const input = '';
  const options = {};

  const output = readSources(input, options);

  test.equal(output.length, 4);
});
