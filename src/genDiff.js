import fs from 'fs';
import path from 'path';
import getParser from './parsers.js';
import getFormatter from './formatters/index.js';
import compare from './compare.js';

const getParserType = (pathToFile) => {
  const fileExtName = path.extname(pathToFile);
  switch (fileExtName) {
    case '.json': return 'json';
    case '.yml':
    case '.yaml': return 'yml';
    case '.ini': return 'ini';
    default:
      throw new Error(`Unsupported file type: '${pathToFile}'!`);
  }
};

const readConfigFromFile = (pathToFile) => {
  const fileType = getParserType(pathToFile);
  try {
    const fileContent = fs.readFileSync(pathToFile, 'utf-8');
    return getParser(fileType)(fileContent);
  } catch {
    throw new Error(`Error opening file: '${pathToFile}'`);
  }
};

const genDiff = (pathToFirstFile, pathToSecondFile, formatter) => {
  const firstConfig = readConfigFromFile(pathToFirstFile);
  const secondConfig = readConfigFromFile(pathToSecondFile);
  const genDiffResult = getFormatter(formatter)(compare(firstConfig, secondConfig));
  return genDiffResult;
};

export default genDiff;
