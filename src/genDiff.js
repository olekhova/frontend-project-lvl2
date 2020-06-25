import fs from 'fs';
import path from 'path';
import getParser from './parsers.js';
import getFormatter from './formatters/index.js';
import compare from './compare.js';

const getParserType = (pathToFile) => path.extname(pathToFile).slice(1);

const readConfigFromFile = (pathToFile) => {
  const fileType = getParserType(pathToFile);
  const fileContent = fs.readFileSync(pathToFile, 'utf-8');
  return getParser(fileType)(fileContent);
};

const genDiff = (pathToFirstFile, pathToSecondFile, formatter) => {
  const firstConfig = readConfigFromFile(pathToFirstFile);
  const secondConfig = readConfigFromFile(pathToSecondFile);
  const internalRepresentation = compare(firstConfig, secondConfig);
  const genDiffResult = getFormatter(formatter)(internalRepresentation);
  return genDiffResult;
};

export default genDiff;
