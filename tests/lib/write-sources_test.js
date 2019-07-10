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

const writeSources = require('../../lib/write-sources');

tape('writeSources - nothing', (test) => {
  test.plan(1);

  const filename = 'tests/fixtures/stretchy-inline.css.map';
  const content = '';
  const outdir = 'tmp/write-sources';
  const options = {
    verbose: true
  };

  const output = writeSources(filename, content, outdir, options);

  test.notOk(output);
});
