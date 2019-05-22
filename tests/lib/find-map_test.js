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

const findMap = require('../../lib/find-map');

tape('findMap - LICENSE', (test) => {
  test.plan(1);

  const content = findMap('LICENSE', {verbose: true});

  test.notOk(content);
});

tape('findMap - stretchy-inline-sources.min.js', (test) => {
  test.plan(1);

  const content = findMap('tests/fixtures/stretchy-inline-sources.min.js');

  test.equal(content.length, 3269);
});

tape('findMap - stretchy-inline.css.map', (test) => {
  test.plan(1);

  const content = findMap('tests/fixtures/stretchy-inline.css.map');

  test.equal(content.length, 10466);
});

tape('findMap - stretchy-with-sources.min.js.map', (test) => {
  test.plan(1);

  const content = findMap('tests/fixtures/stretchy-with-sources.min.js.map');

  test.equal(content.length, 8514);
});

tape('findMap - stretchy.css.map', (test) => {
  test.plan(1);

  const content = findMap('tests/fixtures/stretchy.css.map');

  test.equal(content.length, 3355);
});

tape('findMap - stretchy.min.js', (test) => {
  test.plan(1);

  const content = findMap('tests/fixtures/stretchy.min.js');

  test.notOk(content);
});

tape('findMap - stretchy.min.js.map', (test) => {
  test.plan(1);

  const content = findMap('tests/fixtures/stretchy.min.js.map');

  test.equal(content.length, 3269);
});
