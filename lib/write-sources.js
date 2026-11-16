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

import fs from 'fs-extra';

// https://security.stackexchange.com/a/123723
//const SAFE_PATH = /^(\.\.[/\\])+/gu;
const AFTER_QUESTION = /(\?\S+)/gu;

const toExtendedPath = (filePath) => {
  if (process.platform === 'win32' && filePath.length >= 260 && !filePath.startsWith('\\\\?\\')) {
    const resolved = path.resolve(filePath);
    return resolved.startsWith('\\\\?\\') ? resolved : `\\\\?\\${resolved}`;
  }
  return filePath;
};

const writeSources = (filename, content, outdir, options) => {
  filename = filename.replace(AFTER_QUESTION, '');

  const outputFilepath = path.join(outdir, filename);

  // Prevent path traversal: ensure the resolved output stays within outdir
  const resolvedOutdir = path.resolve(outdir);
  const resolvedFilepath = path.resolve(outputFilepath);
  if (!resolvedFilepath.startsWith(resolvedOutdir + path.sep) && resolvedFilepath !== resolvedOutdir) {
    console.error(`Skipping unsafe path "${filename}"`);
    return;
  }

  if (options.verbose) {
    console.log(`Writing to file "${outputFilepath}"`);
  }

  const targetDir = toExtendedPath(path.dirname(outputFilepath));
  const targetFile = toExtendedPath(outputFilepath);

  fs.ensureDirSync(targetDir);

  if (fs.existsSync(targetFile)) {
    console.error(`File "${outputFilepath}" already exists, skipping!`);
  }
  else {
    try {
      fs.writeFileSync(targetFile, content, 'utf8');
    }
    catch (error) {
      console.error(`Error while trying to write file "${outputFilepath}"`);
      console.error(error.message);
    }
  }
};

export default writeSources;
