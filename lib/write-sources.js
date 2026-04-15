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

const AFTER_QUESTION = /(\?\S+)/gu;

const writeSources = (filename, content, outdir, options) => {
  filename = filename.replace(AFTER_QUESTION, '');

  const resolvedOutdir = path.resolve(outdir);
  const outputFilepath = path.resolve(outdir, filename);

  if (!outputFilepath.startsWith(resolvedOutdir + path.sep) && outputFilepath !== resolvedOutdir) {
    console.error(`Path traversal detected: "${filename}" resolves outside output directory, skipping!`);

    return;
  }

  if (options.verbose) {
    console.log(`Writing to file "${outputFilepath}"`);
  }

  fs.ensureDirSync(path.dirname(outputFilepath));

  if (fs.existsSync(outputFilepath)) {
    console.error(`File "${outputFilepath}" already exists, skipping!`);
  }
  else {
    try {
      fs.writeFileSync(outputFilepath, content, 'utf8');
    }
    catch (error) {
      console.error(`Error while trying to write file "${outputFilepath}"`);
      console.error(error.message);
    }
  }
};

export default writeSources;
