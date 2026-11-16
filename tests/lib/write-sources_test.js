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
import path from 'node:path';
import tape from 'tape';

import writeSources from '../../lib/write-sources.js';

tape('writeSources - nothing', (test) => {
  test.plan(1);

  const outdir = 'tmp/write-sources-nothing';
  const filename = 'tests/fixtures/stretchy-inline.css.map';
  const content = '';
  const options = {
    verbose: true
  };

  const output = writeSources(filename, content, outdir, options);

  test.notOk(output);
});

tape('writeSources - skips unsafe path attempting directory traversal', (test) => {
  test.plan(1);

  const filename = '../../outside.js';
  const content = 'console.log("bad");';
  const outdir = 'tmp/write-sources-unsafe';
  const options = {
    verbose: false
  };

  writeSources(filename, content, outdir, options);

  test.notOk(fs.existsSync('outside.js'), 'Unsafe path should be skipped');
});

tape('writeSources - skips existing file', (test) => {
  test.plan(2);

  const filename = 'existing.js';
  const content1 = 'console.log("first");';
  const content2 = 'console.log("second");';
  const outdir = 'tmp/write-sources-existing-' + Date.now();
  const options = {
    verbose: true
  };

  writeSources(filename, content1, outdir, options);
  const targetPath = path.join(outdir, filename);
  test.ok(fs.existsSync(targetPath), 'File was written first time');

  // Attempt to write again
  writeSources(filename, content2, outdir, options);
  const fileContent = fs.readFileSync(targetPath, 'utf8');
  test.equal(fileContent, content1, 'File content was not overwritten');
});
