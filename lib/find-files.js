/**
 * shuji (周氏)
 * https://github.com/paazmaya/shuji
 *
 * Reverse engineering JavaScript and CSS sources from sourcemaps
 *
 * Copyright (c) Juga Paazmaya <paazmaya@yahoo.com> (https://paazmaya.fi)
 * Licensed under the MIT license
 */

const fs = require('fs'),
  path = require('path');

/**
 * Determine if the given existing filepath is a file or directory
 * and continue with filtering and recursive when needed.
 *
 * @param {string} filepath Relative filepath that exists
 * @param {RegExp} matcher Regular expression for matching filenames
 * @returns {array} List of files with full path
 */
const findFiles = (filepath, matcher) => {
  let files = [],
    stat;

  try {
    stat = fs.statSync(filepath);
  }
  catch (error) {
    console.error(`Filepath "${filepath}" could not be read`);

    return files;
  }

  if (stat.isDirectory()) {
    const list = fs.readdirSync(filepath);

    list.forEach((item) => {
      files = files.concat(findFiles(path.join(filepath, item), matcher));
    });
  }
  else if (filepath.match(matcher) && stat.isFile()) {
    files.push(filepath);
  }

  return files;
};

module.exports = findFiles;
