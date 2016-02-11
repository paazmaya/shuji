/**
 * shuji (周氏)
 * https://github.com/paazmaya/shuji
 *
 * Reverse engineering JavaScript sources from sourcemaps
 *
 * Copyright (c) Juga Paazmaya <paazmaya@yahoo.com> (http://www.paazmaya.fi)
 * Licensed under the MIT license
 */
'use strict';

const path = require('path');

const sourceMap = require('source-map');

module.exports = (input) => {

  const consumer = new sourceMap.SourceMapConsumer(input);
  console.log('hasContentsOfAllSources: ' + consumer.hasContentsOfAllSources());

  let map = {};

  consumer.sources.forEach((source, index) => {
    console.log('source: ' + source);
    const contents = consumer.sourceContentFor(source);
    map[path.basename(source)] = contents;
  });

  return map;
};
