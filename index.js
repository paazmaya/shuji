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

const readSources = require('./lib/read-sources');

/**
 * @param {string} input Contents of the sourceMap file
 * @param {object} options Options object
 * @param {boolean} options.verbose Shall there be more output
 *
 * @returns {object} Source contents mapped to file names
 */
module.exports = readSources;
