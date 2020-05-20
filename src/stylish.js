import { isObject } from 'lodash';
// import { inspect } from 'util';

const stylish = (diffList) => {
  const indentStack = [];
  indentStack.push('  ');
  const top = (stack) => stack[stack.length - 1];

  const printValue = (obj, topIndent, indent) => {
    if (!isObject(obj)) {
      return `${obj}`;
    }
    const prettyPrintObject = (o, i) => Object.entries(o).reduce((acc, kv) => {
      if (isObject(kv[1])) {
        return [...acc,
          `${i}${kv[0]}: {`,
          ...prettyPrintObject(kv[1], `${indent}${i}`),
          `${i}}`,
        ];
      }
      return [...acc, `${i}${kv[0]}: ${kv[1]}`];
    }, []);
    const inner = [...prettyPrintObject(obj, indent)].map((l) => `${topIndent}     ${l}\n`).join('');
    return `{\n${inner}${topIndent}  }`;
  };

  const clbFunc = (elem) => {
    switch (elem.type) {
      case 'unchanged': {
        const topIndent = top(indentStack);
        indentStack.push(`    ${topIndent}`);
        const result = `${topIndent}  ${elem.name}: ${printValue(elem.value, topIndent, ' ')}`;
        indentStack.pop();
        return result;
      }
      case 'changed': {
        const topIndent = top(indentStack);
        indentStack.push(`    ${topIndent}`);
        const result = `${topIndent}- ${elem.name}: ${printValue(elem.valueBefore, topIndent, ' ')}\n${topIndent}+ ${elem.name}: ${printValue(elem.valueAfter, topIndent, ' ')}`;
        indentStack.pop();
        return result;
      }
      case 'deleted': {
        const topIndent = top(indentStack);
        indentStack.push(`    ${topIndent}`);
        const result = `${topIndent}- ${elem.name}: ${printValue(elem.value, topIndent, ' ')}`;
        indentStack.pop();
        return result;
      }
      case 'new': {
        const topIndent = top(indentStack);
        indentStack.push(`    ${topIndent}`);
        const result = `${topIndent}+ ${elem.name}: ${printValue(elem.value, topIndent, ' ')}`;
        indentStack.pop();
        return result;
      }
      case 'object': {
        const newLocalObj = elem.value;
        const topIndent = top(indentStack);
        indentStack.push(`    ${topIndent}`);
        const objDiff = newLocalObj.map(clbFunc).join('\n');
        const result = `  ${topIndent}${elem.name}: {\n${objDiff}\n  ${topIndent}}`;
        indentStack.pop();
        return result;
      }
      // inspect(elem.value, { compact: false, depth: Infinity })
      // JSON.stringify(elem.value, null, ' ')
      default:
        return null;
    }
  };
  return `{\n${diffList.map(clbFunc).join('\n')}\n}`;
};

export default stylish;
