/**
 * shuji (周氏)
 * https://github.com/paazmaya/shuji
 *
 * Reverse engineering JavaScript and CSS sources from sourcemaps
 *
 * Copyright (c) Juga Paazmaya <paazmaya@yahoo.com> (http://www.paazmaya.fi)
 * Licensed under the MIT license
 */
'use strict';

const path = require('path');

const sourceMap = require('source-map');

module.exports = (input) => {

  const consumer = new sourceMap.SourceMapConsumer(input);

  const map = {};

  if (consumer.hasContentsOfAllSources()) {
    consumer.sources.forEach((source) => {
      const contents = consumer.sourceContentFor(source);
      map[path.basename(source)] = contents;
    });
  }
  return map;
};
