/**
 * shuji (周氏)
 * https://github.com/paazmaya/shuji
 *
 * Reverse engineering JavaScript and CSS sources from sourcemaps
 *
 * Copyright (c) Juga Paazmaya <paazmaya@yahoo.com> (https://paazmaya.fi)
 * Licensed under the MIT license
 */

import readSources from './lib/read-sources.js';
import findMap from './lib/find-map.js';

/**
 * @param {string} inputFilepath Contents of the sourceMap file
 * @param {object} options Options object
 * @param {boolean} options.verbose Shall there be more output
 * @param {boolean} options.preserve Preserve original folder structure
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
      false,
    preserve: typeof options.preserve === 'boolean' ?
      options.preserve :
      false
  });

  const sourceFiles = Object.entries(output);

  if (!sourceFiles.length) {
    console.error(`Could not get any sources for "${inputFilepath}"`);
  }

  return sourceFiles;
};

export default handleInput;
