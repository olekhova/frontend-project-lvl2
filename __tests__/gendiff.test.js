import path from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const fileNameBefore = getFixturePath('before');
const fileNameAfter = getFixturePath('after');
const configTypes = [['json'], ['yml'], ['ini']];

const readFile = (fileName) => fs.readFileSync(getFixturePath(fileName), 'utf-8');
const formatters = ['', 'Plain', 'Json'];

describe.each(configTypes)('genDiff %s', (configType) => {
  test.each(formatters)('genDiff%s', (formatter) => {
    const result = genDiff(`${fileNameBefore}.${configType}`, `${fileNameAfter}.${configType}`, `${formatter}`);
    const expected = readFile(`result${formatter}.txt`);
    expect(result).toEqual(expected);
  });
});
