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

import normalizeSourcePath from '../../lib/normalize-source-path.js';

// Webpack triple-slash (no namespace)

tape('normalizeSourcePath - webpack:/// with ./', (test) => {
  test.plan(1);
  test.equal(normalizeSourcePath('webpack:///./src/index.js'), 'src/index.js');
});

tape('normalizeSourcePath - webpack:/// with ../', (test) => {
  test.plan(1);
  test.equal(normalizeSourcePath('webpack:///../node_modules/react/index.js'), 'node_modules/react/index.js');
});

// Webpack double-slash with named namespace

tape('normalizeSourcePath - webpack://namespace/ with ./', (test) => {
  test.plan(1);
  test.equal(normalizeSourcePath('webpack://my-lib/./src/lib.js'), 'src/lib.js');
});

tape('normalizeSourcePath - webpack://namespace/ without ./', (test) => {
  test.plan(1);
  test.equal(normalizeSourcePath('webpack://my-lib/src/lib.js'), 'src/lib.js');
});

tape('normalizeSourcePath - webpack://namespace only, no path after', (test) => {
  test.plan(1);
  test.equal(normalizeSourcePath('webpack://my-lib'), '');
});

// Fixture cases from preserve-folder-structure.min.js.map

tape('normalizeSourcePath - fixture: classes/person.js', (test) => {
  test.plan(1);
  test.equal(normalizeSourcePath('webpack://my-webpack-project/./classes/person.js'), 'classes/person.js');
});

tape('normalizeSourcePath - fixture: webpack/bootstrap (webpack is a folder name)', (test) => {
  test.plan(1);
  test.equal(normalizeSourcePath('webpack://my-webpack-project/webpack/bootstrap'), 'webpack/bootstrap');
});

tape('normalizeSourcePath - fixture: index.js', (test) => {
  test.plan(1);
  test.equal(normalizeSourcePath('webpack://my-webpack-project/./index.js'), 'index.js');
});

// Other URL schemes

tape('normalizeSourcePath - file:///', (test) => {
  test.plan(1);
  test.equal(normalizeSourcePath('file:///home/user/src/app.js'), 'home/user/src/app.js');
});

tape('normalizeSourcePath - http://', (test) => {
  test.plan(1);
  test.equal(normalizeSourcePath('http://example.com/bundle.js'), 'example.com/bundle.js');
});

tape('normalizeSourcePath - https://', (test) => {
  test.plan(1);
  test.equal(normalizeSourcePath('https://cdn.example.com/lib.js'), 'cdn.example.com/lib.js');
});

// Relative paths without schemes

tape('normalizeSourcePath - leading ../../', (test) => {
  test.plan(1);
  test.equal(normalizeSourcePath('../../app/main.js'), 'app/main.js');
});

tape('normalizeSourcePath - leading ./', (test) => {
  test.plan(1);
  test.equal(normalizeSourcePath('./utils/helper.js'), 'utils/helper.js');
});

tape('normalizeSourcePath - leading single ../', (test) => {
  test.plan(1);
  test.equal(normalizeSourcePath('../lib/utils.js'), 'lib/utils.js');
});

// Edge cases

tape('normalizeSourcePath - empty string', (test) => {
  test.plan(1);
  test.equal(normalizeSourcePath(''), '');
});

tape('normalizeSourcePath - undefined', (test) => {
  test.plan(1);
  test.equal(normalizeSourcePath(), '');
});

tape('normalizeSourcePath - only ../', (test) => {
  test.plan(1);
  test.equal(normalizeSourcePath('../'), '');
});

tape('normalizeSourcePath - multiple ../ only', (test) => {
  test.plan(1);
  test.equal(normalizeSourcePath('../../'), '');
});

tape('normalizeSourcePath - absolute path /etc/passwd', (test) => {
  test.plan(1);
  test.equal(normalizeSourcePath('/etc/passwd'), 'etc/passwd');
});

tape('normalizeSourcePath - multiple leading slashes', (test) => {
  test.plan(1);
  test.equal(normalizeSourcePath('///src/app.js'), 'src/app.js');
});

// Windows paths

tape('normalizeSourcePath - Windows drive letter with forward slash', (test) => {
  test.plan(1);
  test.equal(normalizeSourcePath('C:/foo/bar.js'), 'foo/bar.js');
});

tape('normalizeSourcePath - Windows drive letter with backslash', (test) => {
  test.plan(1);
  test.equal(normalizeSourcePath('C:\\foo\\bar.js'), 'foo/bar.js');
});

tape('normalizeSourcePath - Windows path with mixed slashes', (test) => {
  test.plan(1);
  test.equal(normalizeSourcePath('D:\\src/components\\App.js'), 'src/components/App.js');
});

// Passthrough (already clean)

tape('normalizeSourcePath - already clean path', (test) => {
  test.plan(1);
  test.equal(normalizeSourcePath('src/components/App.js'), 'src/components/App.js');
});

tape('normalizeSourcePath - simple filename', (test) => {
  test.plan(1);
  test.equal(normalizeSourcePath('index.js'), 'index.js');
});
