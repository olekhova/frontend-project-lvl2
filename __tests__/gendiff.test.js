import path from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const fileBefore = getFixturePath('before');
const fileAfter = getFixturePath('after');
const fileBeforeTree = getFixturePath('beforeTree');
const fileAfterTree = getFixturePath('afterTree');
const configTypes = [['json'], ['yml'], ['ini']];
const expected = String(fs.readFileSync(getFixturePath('result.txt')));
const expectedTree = String(fs.readFileSync(getFixturePath('resultTree.txt')));

describe.each(configTypes)('gendiff %s', (configType) => {
  test('plane', () => {
    const result = genDiff(`${fileBefore}.${configType}`, `${fileAfter}.${configType}`);
    expect(result).toEqual(expected);
  });
  test('tree', () => {
    const result = genDiff(`${fileBeforeTree}.${configType}`, `${fileAfterTree}.${configType}`);
    expect(result).toEqual(expectedTree);
  });
});