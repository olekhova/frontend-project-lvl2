import path from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const fileBefore = getFixturePath('before');
const fileAfter = getFixturePath('after');
const configTypes = [['json'], ['yml'], ['ini']];
const expectedStylish = fs.readFileSync(getFixturePath('resultStylish.txt'), 'utf-8');
const expectedPlain = fs.readFileSync(getFixturePath('resultPlain.txt'), 'utf-8');
const expectedJson = fs.readFileSync(getFixturePath('resultJson.txt'), 'utf-8');

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
