import path from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const fileNameBefore = getFixturePath('before');
const fileNameAfter = getFixturePath('after');
const configTypes = [['json'], ['yml'], ['ini']];
const readFile = (fileName) => fs.readFileSync(getFixturePath(fileName), 'utf-8');
const formatNames = ['', 'plain', 'json'];

describe.each(configTypes)('genDiff %s', (configType) => {
  test.each(formatNames)('genDiff%s', (formatName) => {
    const result = genDiff(`${fileNameBefore}.${configType}`, `${fileNameAfter}.${configType}`, formatName);
    const expected = readFile(`result${formatName}.txt`);
    expect(result).toEqual(expected);
  });
});
