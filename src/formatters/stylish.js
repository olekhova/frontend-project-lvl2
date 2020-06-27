import { isObject } from 'lodash';

const getValue = (localValue, topIndent, indentStep) => {
  if (!isObject(localValue)) {
    return `${localValue}`;
  }
  const localKeys = Object.keys(localValue);
  const newTopIndent = `${topIndent}${indentStep}`;
  const innerValue = localKeys
    .map((key) => `${topIndent}${indentStep.repeat(3)}${key}: ${getValue(localValue[key], newTopIndent, indentStep)}`)
    .join('\n');
  return `{\n${innerValue}\n${newTopIndent}}`;
};

const stylish = (diffList) => {
  const iter = (localDiffList, topIndent, indentStep) => localDiffList
    .map((elem) => {
      switch (elem.type) {
        case 'unchanged': return `${topIndent}  ${elem.name}: ${getValue(elem.value, topIndent, indentStep)}`;
        case 'changed': return `${topIndent}- ${elem.name}: ${getValue(elem.valueBefore, topIndent, indentStep)}\n${topIndent}+ ${elem.name}: ${getValue(elem.valueAfter, topIndent, indentStep)}`;
        case 'deleted': return `${topIndent}- ${elem.name}: ${getValue(elem.value, topIndent, indentStep)}`;
        case 'added': return `${topIndent}+ ${elem.name}: ${getValue(elem.value, topIndent, indentStep)}`;
        case 'object': {
          const newDiffList = elem.children;
          const newTopIndent = `${topIndent}${indentStep.repeat(2)}`;
          return `${topIndent}  ${elem.name}: {\n${iter(newDiffList, newTopIndent, indentStep)}\n${topIndent}${indentStep}}`;
        }
        default:
          throw new Error(`Unknown element type: '${elem.type}'!`);
      }
    }).join('\n');
  const result = `{\n${iter(diffList, '  ', '  ')}\n}`;
  console.log(result);
  return result;
};

export default stylish;
