import path from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const fileBefore = getFixturePath('before');
const fileAfter = getFixturePath('after');
const configTypes = [['json'], ['yml'], ['ini']];

const readFile = (fileName) => fs.readFileSync(getFixturePath(fileName), 'utf-8');
const expectedStylish = readFile('resultStylish.txt');
const expectedPlain = readFile('resultPlain.txt');
const expectedJson = readFile('resultJson.txt');

describe.each(configTypes)('genDiff %s', (configType) => {
  test('genDiffStylish', () => {
    const result = genDiff(`${fileBefore}.${configType}`, `${fileAfter}.${configType}`);
    expect(result).toEqual(expectedStylish);
  });
  test('genDiffPlain', () => {
    const result = genDiff(`${fileBefore}.${configType}`, `${fileAfter}.${configType}`, 'plain');
    expect(result).toEqual(expectedPlain);
  });
  test('genDiffJson', () => {
    const result = genDiff(`${fileBefore}.${configType}`, `${fileAfter}.${configType}`, 'json');
    expect(result).toEqual(expectedJson);
  });
});
