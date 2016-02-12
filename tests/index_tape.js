/**
 * shuji (周氏)
 * https://github.com/paazmaya/shuji
 *
 * Reverse engineering JavaScript and CSS sources from sourcemaps
 *
 * Copyright (c) Juga Paazmaya <paazmaya@yahoo.com> (http://www.paazmaya.fi)
 * Licensed under the MIT license
 */
'use strict';

const tape = require('tape'),
  shuji = require('../index');

tape('function is exported', (test) => {
  test.plan(1);

  test.equal(typeof shuji, 'function');
});

