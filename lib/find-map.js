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

const MATCH_MAP = /\.map$/iu;
const MATCH_CODE = /\.(js|css)$/iu;
const FIND_SOURCE_FILE = /\/\/#\s*sourceMappingURL=([.\w]+map)/iu;
const FIND_SOURCE_BASE64 = /\/\*?\/?#\s*sourceMappingURL=([.\w\-/=;:]*)base64,([\w]+=)/iu;
const FIND_SOURCE_UENC = /\/\*?\/?#\s*sourceMappingURL=([.\w\-/=;:]+),([;:,.\-\w%]+)/iu;

/**
 * Find the sourceMap and return its contents.
 * In case the given filepath is already the sourceMap file, not much is done.
 * In case the given filepath is a JavaScript file, then the matching sourceMap
 * is being search for.
 *
 * @param {string} filepath
 * @param {object} options Options object. If not defined, verbose=false
 * @param {boolean} options.verbose Shall there be more output
 *
 * @returns {string|boolean} soureMap contents or false when not found
 */
const findMap = (filepath, options) => {
  options = options || {
    verbose: false
  };

  const input = fs.readFileSync(filepath, 'utf8');

  if (filepath.match(MATCH_MAP)) {
    return input;
  }
  else if (filepath.match(MATCH_CODE)) {
    if (input.match(FIND_SOURCE_BASE64)) {
      const sourceMappingMatch = FIND_SOURCE_BASE64.exec(input);
      if (sourceMappingMatch && sourceMappingMatch.length > 2) {
        if (options.verbose) {
          console.log(`Input file "${filepath}" contains Base64 of ${sourceMappingMatch[2].length} length`);
        }
        const buf = Buffer.from(sourceMappingMatch[2], 'base64');

        return buf.toString('utf8');
      }
    }
    else if (input.match(FIND_SOURCE_UENC)) {
      const sourceMappingMatch = FIND_SOURCE_UENC.exec(input);
      if (sourceMappingMatch && sourceMappingMatch.length > 2) {
        if (options.verbose) {
          console.log(`Input file "${filepath}" contains URL encoded of ${sourceMappingMatch[2].length} length`);
        }
        const buf = Buffer.from(sourceMappingMatch[2], 'ascii');

        return buf.toString('utf8');
      }
    }
    else if (input.match(FIND_SOURCE_FILE)) {
      const sourceMappingMatch = FIND_SOURCE_FILE.exec(input);
      if (sourceMappingMatch && sourceMappingMatch.length > 1) {
        if (options.verbose) {
          console.log(`Input file "${filepath}" points to "${sourceMappingMatch[1]}"`);
        }
      }

      // Since the sourceMappingURL is relative, try to find it from the same folder
      const mapFile = path.join(path.dirname(filepath), sourceMappingMatch[1]);
      try {
        fs.accessSync(mapFile);
      }
      catch (error) {
        console.error(`Could not access "${mapFile}"`);
        console.error(error.message);

        return false;
      }

      return fs.readFileSync(mapFile, 'utf8');
    }
  }
  else if (options.verbose) {
    console.error(`Input file "${filepath}" was not a map nor a code file`);
  }

  return false;
};

module.exports = findMap;
