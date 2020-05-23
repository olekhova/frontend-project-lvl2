import fs from 'fs';
import path from 'path';
import getParser from './parsers.js';
import getFormatter from './formatters/index.js';
import compareTree from './compareTree.js';

const genDiff = (pathToFirstFile, pathToSecondFile, formatter) => {
  const firstFileContents = fs.readFileSync(pathToFirstFile, 'utf-8');
  const firstFileExtName = path.extname(pathToFirstFile);
  const firstFile = getParser(firstFileExtName)(firstFileContents);

  const secondFileContents = fs.readFileSync(pathToSecondFile, 'utf-8');
  const secondFileExtName = path.extname(pathToSecondFile);
  const secondFile = getParser(secondFileExtName)(secondFileContents);

  const genDiffResult = getFormatter(formatter)(compareTree(firstFile, secondFile));
  return genDiffResult;
};

export default genDiff;
