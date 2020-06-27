import fs from 'fs';
import path from 'path';
import getParser from './parsers.js';
import getFormatter from './formatters/index.js';
import compare from './compare.js';

const getParserType = (pathToFile) => path.extname(pathToFile).slice(1);

const readConfigFromFile = (pathToFile) => {
  const parserType = getParserType(pathToFile);
  const fileContent = fs.readFileSync(pathToFile, 'utf-8');
  return getParser(parserType)(fileContent);
};

const genDiff = (pathToFirstFile, pathToSecondFile, formatter) => {
  const firstConfig = readConfigFromFile(pathToFirstFile);
  const secondConfig = readConfigFromFile(pathToSecondFile);
  const genDiffResult = getFormatter(formatter)(compare(firstConfig, secondConfig));
  return genDiffResult;
};

export default genDiff;
