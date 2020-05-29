import { isObject } from 'lodash';

const top = (stack) => stack[stack.length - 1];

const printValue = (obj, topIndent, indent) => {
  if (!isObject(obj)) {
    return `${obj}`;
  }
  const prettyPrintObject = (o, i) => Object.entries(o).reduce((acc, [k, v]) => {
    if (isObject(v)) {
      return [...acc,
        `${i}${k}: {`,
        ...prettyPrintObject(v, `${indent}${i}`),
        `${i}}`,
      ];
    }
    return [...acc, `${i}${k}: ${v}`];
  }, []);
  const inner = [...prettyPrintObject(obj, indent)].map((l) => `${topIndent}     ${l}\n`).join('');
  return `{\n${inner}${topIndent}  }`;
};

const stylish = (diffList) => {
  const indentStack = [];
  indentStack.push('  ');
  const clbFunc = (element) => {
    const topIndent = top(indentStack);
    const elemToString = (elem) => {
      switch (elem.type) {
        case 'unchanged': return `${topIndent}  ${elem.name}: ${printValue(elem.value, topIndent, ' ')}`;
        case 'changed': return `${topIndent}- ${elem.name}: ${printValue(elem.valueBefore, topIndent, ' ')}\n${topIndent}+ ${elem.name}: ${printValue(elem.valueAfter, topIndent, ' ')}`;
        case 'deleted': return `${topIndent}- ${elem.name}: ${printValue(elem.value, topIndent, ' ')}`;
        case 'new': return `${topIndent}+ ${elem.name}: ${printValue(elem.value, topIndent, ' ')}`;
        case 'object': {
          const objDiff = elem.children.map(clbFunc).join('\n');
          return `  ${topIndent}${elem.name}: {\n${objDiff}\n  ${topIndent}}`;
        }
        default:
          throw new Error(`Unknown element type: '${elem.type}'!`);
      }
    };
    indentStack.push(`    ${topIndent}`);
    const result = elemToString(element);
    indentStack.pop();
    return result;
  };
  return `{\n${diffList.map(clbFunc).join('\n')}\n}`;
};

export default stylish;
