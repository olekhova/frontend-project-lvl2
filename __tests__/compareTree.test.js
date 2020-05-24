import path from 'path';
import fs from 'fs';
import compareTree from '../src/compare.js';

import getParser from '../src/parsers.js';


const expected = [
  {
    type: 'object',
    name: 'common',
    children: [
      {
        type: 'unchanged',
        name: 'setting1',
        value: 'Value 1',
      },
      {
        type: 'deleted',
        name: 'setting2',
        value: 200,
      },
      {
        type: 'changed',
        name: 'setting3',
        valueBefore: true,
        valueAfter: { key: 'value' },
      },
      {
        type: 'object',
        name: 'setting6',
        children: [
          {
            type: 'unchanged',
            name: 'key',
            value: 'value',
          },
          {
            type: 'new',
            name: 'ops',
            value: 'vops',
          },
        ],
      },
      {
        type: 'new',
        name: 'follow',
        value: false,
      },
      {
        type: 'new',
        name: 'setting4',
        value: 'blah blah',
      },
      {
        type: 'new',
        name: 'setting5',
        value: { key5: 'value5' },
      },
    ],
  },
  {
    type: 'object',
    name: 'group1',
    children: [
      {
        type: 'changed',
        name: 'baz',
        valueBefore: 'bas',
        valueAfter: 'bars',
      },
      {
        type: 'unchanged',
        name: 'foo',
        value: 'bar',
      },
      {
        type: 'changed',
        name: 'nest',
        valueBefore: { key: 'value' },
        valueAfter: 'str',
      },
    ],
  },
  {
    type: 'deleted',
    name: 'group2',
    value: { abc: 12345 },
  },
  {
    type: 'new',
    name: 'group3',
    value: { fee: 100500 },
  },
];

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const configTypes = ['.json', '.yml', '.ini'];

// [ {'json', jsonBefore, jsonAfter}, {'yml', ymlBefore, ymlAfter}, ...]
const testData = configTypes.map((ext) => {
//  console.log(`preparing data: ${ext}`);
  const beforeFileName = `beforeTree${ext}`;
  const afterFileName = `afterTree${ext}`;
  const firstFileContents = fs.readFileSync(getFixturePath(beforeFileName), 'utf-8');
  const secondFileContents = fs.readFileSync(getFixturePath(afterFileName), 'utf-8');
  // console.log(typeof firstFileContents);
  // console.log(typeof secondFileContents);
  const beforeObject = getParser(ext)(firstFileContents);
  const afterObject = getParser(ext)(secondFileContents);
  return [ext, beforeObject, afterObject];
});

describe.each(testData)('compare %s', (ext, before, after) => {
  test('compareTree', () => {
    const result = compareTree(before, after);
    expect(result).toEqual(expected);
  });
});
