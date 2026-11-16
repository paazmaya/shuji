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

import findMap from '../../lib/find-map.js';

tape('findMap - LICENSE', (test) => {
  test.plan(1);

  const options = {
    verbose: true
  };
  const content = findMap('LICENSE', options);

  test.notOk(content);
});

tape('findMap - stretchy-inline-sources.min.js', (test) => {
  test.plan(1);

  const options = {
    verbose: true
  };
  const content = findMap('tests/fixtures/stretchy-inline-sources.min.js', options);

  test.equal(content.length, 3269);
});

tape('findMap - stretchy-inline.css has inline sources', (test) => {
  test.plan(1);

  const content = findMap('tests/fixtures/stretchy-inline.css');

  test.equal(content.length, 1243);
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

  const options = {
    verbose: true
  };
  const content = findMap('tests/fixtures/stretchy.css.map', options);

  test.equal(content.length, 1180);
});

tape('findMap - stretchy.min.js finds separate map file', (test) => {
  test.plan(1);

  const options = {
    verbose: true
  };
  const content = findMap('tests/fixtures/stretchy.min.js', options);

  test.equal(content.length, 3286);
});

tape('findMap - stretchy.min.js.map', (test) => {
  test.plan(1);

  const content = findMap('tests/fixtures/stretchy.min.js.map');

  test.equal(content.length, 3286);
});

tape('findMap - code file pointing to missing map file returns false', (test) => {
  test.plan(1);

  const tmpCode = 'tmp/missing-map-test.js';
  fs.mkdirSync('tmp', { recursive: true });
  fs.writeFileSync(tmpCode, 'console.log(1);\n//# sourceMappingURL=nonexistent-map.js.map\n');

  const content = findMap(tmpCode, { verbose: true });
  test.equal(content, false, 'Returns false when external map file cannot be accessed');
});

tape('findMap - URL encoded sourceMappingURL', (test) => {
  test.plan(1);

  const raw = '%7B%22version%22:3,%22file%22:%22min.js%22%7D';
  const tmpCode = 'tmp/url-encoded-map-test.js';
  fs.mkdirSync('tmp', { recursive: true });
  fs.writeFileSync(tmpCode, `console.log(1);\n//# sourceMappingURL=data:application/json,${raw}\n`);

  const content = findMap(tmpCode, { verbose: true });
  test.ok(content, 'Reads URL-encoded source mapping');
});
