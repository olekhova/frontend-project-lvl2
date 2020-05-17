import fs from 'fs';
import path from 'path';
import getParser from './parsers.js';
import compareTree from './compareTree.js';

const genDiff = (pathToFirstFile, pathToSecondFile) => {
  const firstFileContents = fs.readFileSync(pathToFirstFile);
  const firstFileExtName = path.extname(pathToFirstFile);
  const firstFile = getParser(firstFileExtName)(firstFileContents);

  const secondFileContents = fs.readFileSync(pathToSecondFile);
  const secondFileExtName = path.extname(pathToSecondFile);
  const secondFile = getParser(secondFileExtName)(secondFileContents);

  const genDiffResult = compareTree(firstFile, secondFile);
  return genDiffResult;
};

export default genDiff;
