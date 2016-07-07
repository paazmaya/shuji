/**
 * shuji (周氏)
 * https://github.com/paazmaya/shuji
 *
 * Reverse engineering JavaScript and CSS sources from sourcemaps
 *
 * Copyright (c) Juga Paazmaya <paazmaya@yahoo.com> (http://paazmaya.fi)
 * Licensed under the MIT license
 */
'use strict';

const path = require('path');

const sourceMap = require('source-map');

/**
 * @param {string} input Contents of the sourcemap file
 * @param {object} options Object {verbose: boolean}
 *
 * @returns {object} Source contents mapped to file names
 */
module.exports = (input, options) => {

  const consumer = new sourceMap.SourceMapConsumer(input);

  const map = {
  };

  if (consumer.hasContentsOfAllSources()) {
    if (options.verbose) {
      console.log('All sources were included in the sourcemap');
    }

    consumer.sources.forEach((source) => {
      const contents = consumer.sourceContentFor(source);
      map[path.basename(source)] = contents;
    });
  }
  else if (options.verbose) {
    console.log('Not all sources were included in the sourcemap');
  }

  return map;
};
