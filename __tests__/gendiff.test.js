import path from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const fileBefore = getFixturePath('before');
const fileAfter = getFixturePath('after');
const fileBeforeTree = getFixturePath('beforeTree');
const fileAfterTree = getFixturePath('afterTree');
const configTypes = [['json'], ['yml'], ['ini']];
const expected = fs.readFileSync(getFixturePath('result.txt'), 'utf-8');
const expectedTree = fs.readFileSync(getFixturePath('resultTree.txt'), 'utf-8');
const expectedPlain = fs.readFileSync(getFixturePath('resultPlain.txt'), 'utf-8');
const expectedJson = fs.readFileSync(getFixturePath('resultJson.txt'), 'utf-8');

describe.each(configTypes)('genDiff %s', (configType) => {
  test('flat', () => {
    const result = genDiff(`${fileBefore}.${configType}`, `${fileAfter}.${configType}`);
    expect(result).toEqual(expected);
  });
  test('tree', () => {
    const result = genDiff(`${fileBeforeTree}.${configType}`, `${fileAfterTree}.${configType}`);
    expect(result).toEqual(expectedTree);
  });
  test('treePlain', () => {
    const result = genDiff(`${fileBeforeTree}.${configType}`, `${fileAfterTree}.${configType}`, 'plain');
    expect(result).toEqual(expectedPlain);
  });
  test('treeJson', () => {
    const result = genDiff(`${fileBeforeTree}.${configType}`, `${fileAfterTree}.${configType}`, 'json');
    expect(result).toEqual(expectedJson);
  });
});
