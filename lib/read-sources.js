/**
 * shuji (周氏)
 * https://github.com/paazmaya/shuji
 *
 * Reverse engineering JavaScript and CSS sources from sourcemaps
 *
 * Copyright (c) Juga Paazmaya <paazmaya@yahoo.com> (https://paazmaya.fi)
 * Licensed under the MIT license
 */

import path from 'node:path';

import {
  SourceMapConsumer
} from 'source-map';

const cleanFileName = (fileName = '') => {
  fileName = fileName.replace('//', '/');

  // https://stackoverflow.com/a/11794507
  return (fileName.match(/[\w\-. /]+/giu) || []).join('');
};

/**
 * @param {string} input Contents of the sourceMap file
 * @param {object} options Options object
 * @param {boolean} options.verbose Shall there be more output
 * @param {boolean} options.preserve Preserve original folder structure
 *
 * @returns {object} Source contents mapped to file names
 */
const readSources = async (input, options) => {

  const consumer = await new SourceMapConsumer(input);

  const map = {};

  if (options.verbose) {
    if (consumer.hasContentsOfAllSources()) {
      console.info('All sources were included in the sourcemap');
    }
    else {
      console.warn('Not all sources were included in the sourcemap');
    }
  }

  consumer.sources.forEach((source) => {
    console.log('source', source);
    console.log('path.basename(source)', path.basename(source));

    const fileName = options.preserve ?
      source
      : path.basename(source);

    console.log('cleanFileName(fileName)', cleanFileName(fileName));

    const contents = consumer.sourceContentFor(source, true);

    if (contents === null) {
      if (options.verbose) {
        console.warn('Not exported');
      }

      return;
    }

    map[cleanFileName(fileName)] = contents;
  });

  consumer.destroy();

  return map;
};

export default readSources;
