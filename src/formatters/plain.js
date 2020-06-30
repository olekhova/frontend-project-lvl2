import { isObject, isString } from 'lodash';

const getValue = (value) => {
  if (isObject(value)) {
    return '[complex value]';
  }
  if (isString(value)) {
    return `'${value}'`;
  }
  return `${value}`;
};

const plain = (diffList) => {
  const iter = (localDiffList, prefix) => localDiffList
    .filter((elem) => elem.type !== 'unchanged')
    .map((elem) => {
      switch (elem.type) {
        case 'changed': return `Property '${prefix}${elem.name}' was changed from ${getValue(elem.valueBefore)} to ${getValue(elem.valueAfter)}`;
        case 'deleted': return `Property '${prefix}${elem.name}' was deleted`;
        case 'added': return `Property '${prefix}${elem.name}' was added with value: ${getValue(elem.value)}`;
        case 'object': {
          const newDiffList = elem.children;
          const newPrefix = `${prefix}${elem.name}.`;
          return iter(newDiffList, newPrefix);
        }
        default:
          throw new Error(`Unknown element type: '${elem.type}'!`);
      }
    })
    .join('\n');
  return iter(diffList, '');
};

export default plain;
