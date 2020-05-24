import fs from 'fs';
import path from 'path';
import getParser from './parsers.js';
import getFormatter from './formatters/index.js';
import compare from './compare.js';

const readFile = (pathToFile) => {
  const fileContent = fs.readFileSync(pathToFile, 'utf-8');
  const fileExtName = path.extname(pathToFile);
  return getParser(fileExtName)(fileContent);
};

const genDiff = (pathToFirstFile, pathToSecondFile, formatter) => {
  const firstFile = readFile(pathToFirstFile);
  const secondFile = readFile(pathToSecondFile);
  const genDiffResult = getFormatter(formatter)(compare(firstFile, secondFile));
  return genDiffResult;
};

export default genDiff;
