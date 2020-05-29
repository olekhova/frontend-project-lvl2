import fs from 'fs';
import path from 'path';
import getParser from './parsers.js';
import getFormatter from './formatters/index.js';
import compare from './compare.js';

const getParserTypeFromExtension = (fileExtention) => {
  switch (fileExtention) {
    case '.json': return 'json';
    case '.yml': return 'yml';
    case '.ini': return 'ini';
    default:
      throw new Error(`Unknown file extention: '${fileExtention}'!`);
  }
};

const readConfigFromFile = (pathToFile) => {
  const fileContent = fs.readFileSync(pathToFile, 'utf-8');
  const fileExtName = path.extname(pathToFile);
  const fileType = getParserTypeFromExtension(fileExtName);
  return getParser(fileType)(fileContent);
};

const genDiff = (pathToFirstFile, pathToSecondFile, formatter) => {
  const firstConfig = readConfigFromFile(pathToFirstFile);
  const secondConfig = readConfigFromFile(pathToSecondFile);
  const genDiffResult = getFormatter(formatter)(compare(firstConfig, secondConfig));
  return genDiffResult;
};

export default genDiff;
