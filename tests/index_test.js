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

const shuji = require('../index');

tape('function is exported', (test) => {
  test.plan(1);

  test.equal(typeof shuji, 'function');
});
