import fs from 'fs';
import path from 'path';
import getParser from './parsers.js';
import compareTree from './compareTree.js';
import stylish from './stylish.js';

const genDiff = (pathToFirstFile, pathToSecondFile) => {
  const firstFileContents = fs.readFileSync(pathToFirstFile, 'utf-8');
  const firstFileExtName = path.extname(pathToFirstFile);
  const firstFile = getParser(firstFileExtName)(firstFileContents);

  const secondFileContents = fs.readFileSync(pathToSecondFile, 'utf-8');
  const secondFileExtName = path.extname(pathToSecondFile);
  const secondFile = getParser(secondFileExtName)(secondFileContents);

  const genDiffResult = stylish(compareTree(firstFile, secondFile));
  return genDiffResult;
};

export default genDiff;
