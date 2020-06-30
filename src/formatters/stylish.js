import { isObject } from 'lodash';

const getValue = (localValue, depth, indentStep) => {
  if (!isObject(localValue)) {
    return `${localValue}`;
  }
  const localKeys = Object.keys(localValue);
  const indent = `${indentStep.repeat(depth * 2)}${indentStep.repeat(2)}`;
  const innerValue = localKeys
    .map((key) => `${indent}${key}: ${getValue(localValue[key], depth + 1, indentStep)}`)
    .join('\n');
  return `{\n${innerValue}\n${indentStep.repeat(depth * 2)}}`;
};

const stylish = (diffList) => {
  const iter = (localDiffList, depth, indentStep) => localDiffList
    .map((elem) => {
      const indent = `${indentStep.repeat((depth - 1) * 2)}${indentStep}`;
      switch (elem.type) {
        case 'unchanged': return `${indent}  ${elem.name}: ${getValue(elem.value, depth, indentStep)}`;
        case 'changed': return `${indent}- ${elem.name}: ${getValue(elem.valueBefore, depth, indentStep)}\n${indent}+ ${elem.name}: ${getValue(elem.valueAfter, depth, indentStep)}`;
        case 'deleted': return `${indent}- ${elem.name}: ${getValue(elem.value, depth, indentStep)}`;
        case 'added': return `${indent}+ ${elem.name}: ${getValue(elem.value, depth, indentStep)}`;
        case 'object': {
          const newDiffList = elem.children;
          return `${indent}  ${elem.name}: {\n${iter(newDiffList, depth + 1, indentStep)}\n${indent}${indentStep}}`;
        }
        default:
          throw new Error(`Unknown element type: '${elem.type}'!`);
      }
    }).join('\n');
  const result = `{\n${iter(diffList, 1, '  ')}\n}`;
  return result;
};

export default stylish;
