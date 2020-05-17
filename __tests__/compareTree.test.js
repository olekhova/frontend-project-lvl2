import path from 'path';
import fs from 'fs';
import compareTree from '../src/compareTree.js';

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const fileBefore = JSON.parse(fs.readFileSync(getFixturePath('beforeTree.json')));
const fileAfter = JSON.parse(fs.readFileSync(getFixturePath('afterTree.json')));
const expected = [
  {
    type: 'object',
    name: 'common',
    value: [
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
        value: [
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
        type: 'newObject',
        name: 'setting5',
        value: { key5: 'value5' },
      },
    ],
  },
  {
    type: 'object',
    name: 'group1',
    value: [
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
    type: 'deletedObject',
    name: 'group2',
    value: { abc: 12345 },
  },
  {
    type: 'newObject',
    name: 'group3',
    value: { fee: 100500 },
  },
];

test('compareTree', () => {
  const result = compareTree(fileBefore, fileAfter);
  expect(result).toEqual(expected);
});
