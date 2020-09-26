/**
 * shuji (周氏)
 * https://github.com/paazmaya/shuji
 *
 * Reverse engineering JavaScript and CSS sources from sourcemaps
 *
 * Copyright (c) Juga Paazmaya <paazmaya@yahoo.com> (https://paazmaya.fi)
 * Licensed under the MIT license
 */

const path = require('path');

const sourceMap = require('source-map');

/**
 * @param {string} input Contents of the sourceMap file
 * @param {object} options Options object
 * @param {boolean} options.verbose Shall there be more output
 *
 * @returns {object} Source contents mapped to file names
 */
const readSources = async (input, options) => {

  const consumer = await new sourceMap.SourceMapConsumer(input);

  const map = {};

  if (consumer.hasContentsOfAllSources()) {
    if (options.verbose) {
      console.log('All sources were included in the sourcemap');
    }

    consumer.sources.forEach((source) => {
      const contents = consumer.sourceContentFor(source);

      console.log('source', source);
      console.log('path.basename(source)', path.basename(source));

      map[path.basename(source)] = contents;
    });
  }
  else if (options.verbose) {
    console.log('Not all sources were included in the sourcemap');
  }

  consumer.destroy();

  return map;
};

module.exports = readSources;
