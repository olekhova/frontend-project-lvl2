import fs from 'fs';
import path from 'path';
import { has, reduce } from 'lodash';
import getParser from './parsers.js';

const genDiff = (pathToFirstFile, pathToSecondFile) => {
  const firstFileContents = fs.readFileSync(pathToFirstFile);
  const firstFileExtName = path.extname(pathToFirstFile);
  const firstFile = getParser(firstFileExtName)(firstFileContents);
  const secondFileContents = fs.readFileSync(pathToSecondFile);
  const secondFileExtName = path.extname(pathToSecondFile);
  const secondFile = getParser(secondFileExtName)(secondFileContents);
  const entriesOfFirstFile = Object.entries(firstFile);
  const entriesOfSecondFile = Object.entries(secondFile);

  const result1 = reduce(entriesOfFirstFile, (acc, keyValue) => {
    if (has(secondFile, keyValue[0]) && (keyValue[1] === secondFile[keyValue[0]])) {
      return `${acc}\n    ${keyValue[0]}: ${keyValue[1]}`;
    }
    if (has(secondFile, keyValue[0]) && (keyValue[1] !== secondFile[keyValue[0]])) {
      return `${acc}\n  - ${keyValue[0]}: ${keyValue[1]}\n  + ${keyValue[0]}: ${secondFile[keyValue[0]]}`;
    }
    if (!has(secondFile, keyValue[0])) {
      return `${acc}\n  - ${keyValue[0]}: ${keyValue[1]}`;
    }
    return acc;
  }, '');

  const result = reduce(entriesOfSecondFile, (acc, keyValue) => {
    if (!has(firstFile, keyValue[0])) {
      return `${acc}\n  + ${keyValue[0]}: ${keyValue[1]}`;
    }
    return acc;
  }, result1);
  return `{${result}\n}`;
};

export default genDiff;
