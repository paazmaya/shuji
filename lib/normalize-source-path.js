/**
 * shuji (周氏)
 * https://github.com/paazmaya/shuji
 *
 * Reverse engineering JavaScript and CSS sources from sourcemaps
 *
 * Copyright (c) Juga Paazmaya <paazmaya@yahoo.com> (https://paazmaya.fi)
 * Licensed under the MIT license
 */

/**
 * Normalize a sourcemap source path by stripping URL scheme prefixes,
 * webpack namespaces, leading relative segments, and leading slashes.
 *
 * For webpack:// URLs with a named namespace (e.g. webpack://my-lib/./src/lib.js),
 * the namespace segment is stripped entirely. For webpack:/// (triple slash),
 * no namespace exists.
 *
 * @param {string} sourcePath Raw source path from the sourcemap
 * @returns {string} Normalized relative path safe for filesystem use
 */
const normalizeSourcePath = (sourcePath = '') => {
  // Step 1: Strip URL scheme (e.g., webpack://, file://, http://)
  const schemeRegex = /^([a-z][a-z0-9+.-]*):\/\//iu;
  const schemeMatch = sourcePath.match(schemeRegex);
  if (schemeMatch) {
    sourcePath = sourcePath.slice(schemeMatch[0].length);

    // For webpack:// with a named namespace (webpack://my-lib/path),
    // strip the namespace segment. Triple-slash webpack:/// has no namespace
    // (after stripping "webpack://", remainder starts with "/").
    if (schemeMatch[1].toLowerCase() === 'webpack' &&
        sourcePath.length > 0 &&
        sourcePath[0] !== '/' &&
        sourcePath[0] !== '.') {
      const slashIndex = sourcePath.indexOf('/');
      if (slashIndex !== -1) {
        sourcePath = sourcePath.slice(slashIndex + 1);
      }
      else {
        sourcePath = '';
      }
    }
  }

  // Step 2: Strip Windows drive letter (e.g., "C:\" or "C:/")
  sourcePath = sourcePath.replace(/^[a-z]:[/\\]/iu, '');

  // Step 3: Normalize backslashes to forward slashes
  sourcePath = sourcePath.replace(/\\/gu, '/');

  // Step 4: Strip leading "/", "./", "../" repeatedly until stable
  let previous;
  do {
    previous = sourcePath;
    sourcePath = sourcePath
      .replace(/^\/+/u, '')
      .replace(/^\.\//u, '')
      .replace(/^\.\.\//u, '');
  } while (sourcePath !== previous && sourcePath.length > 0);

  return sourcePath;
};

export default normalizeSourcePath;
