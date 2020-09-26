/**
 * shuji (周氏)
 * https://github.com/paazmaya/shuji
 *
 * Reverse engineering JavaScript and CSS sources from sourcemaps
 *
 * Copyright (c) Juga Paazmaya <paazmaya@yahoo.com> (https://paazmaya.fi)
 * Licensed under the MIT license
 */

const readSources = require('./lib/read-sources'),
  findMap = require('./lib/find-map');

/**
 * @param {string} inputFilepath Contents of the sourceMap file
 * @param {object} options Options object
 * @param {boolean} options.verbose Shall there be more output
 *
 * @returns {Array} Source contents mapped to file names
 */
const handleInput = async (inputFilepath, options) => {
  if (options.verbose) {
    console.log(`Processing file "${inputFilepath}"`);
  }

  const input = findMap(inputFilepath);

  const output = await readSources(input, {
    verbose: typeof options.verbose === 'boolean' ?
      options.verbose :
      false
  });

  const sourceFiles = Object.entries(output);

  if (!sourceFiles.length) {
    console.error(`Could not get any sources for "${inputFilepath}"`);
  }

  return sourceFiles;
};

module.exports = handleInput;
