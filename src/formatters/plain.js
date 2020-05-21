import { isObject } from 'lodash';

const plain = (diffLList) => {
  const printValue = (vl) => {
    if (!isObject(vl)) {
      if (typeof vl === 'string') {
        return `'${vl}'`;
      }
      return `${vl}`;
    }
    return '[complex value]';
  };
  const clbFunc = (elem, topName) => {
    const prefix = topName ? `${topName}` : '';
    switch (elem.type) {
      case 'changed': return `Property '${prefix}${elem.name}' was changed from ${printValue(elem.valueBefore)} to ${printValue(elem.valueAfter)}`;
      case 'deleted': return `Property '${prefix}${elem.name}' was deleted`;
      case 'new': return `Property '${prefix}${elem.name}' was added with value: ${printValue(elem.value)}`;
      case 'object': {
        const newDiffList = elem.value;
        const newTopName = `${topName}${elem.name}.`;
        return newDiffList.filter((newElem) => newElem.type !== 'unchanged').map((newElem) => clbFunc(newElem, newTopName)).join('\n');
      }
      default:
        return null;
    }
  };
  const result = `${diffLList.filter((elem) => elem.type !== 'unchanged').map((elem) => clbFunc(elem, '')).join('\n')}`;
  return result;
};

export default plain;
