const diffresult = {
  diff: [
    {
      type: 'deleted',
      name: 'b',
      value: 100,
    },
    {
      type: 'newObject',
      name: 'a',
      value: {
        x: {
          key: 'key',
          value: 'value',
        },
        y: {
          x: 100,
          y: 200,
        },
      },
    },
  ],
};

const stylish = (obj) => {
  const localObj = obj;
  const { diff: diffList } = localObj;
  const indentStack = [];
  indentStack.push('  ');
  const top = (stack) => stack[stack.length - 1];
  const clbFunc = (elem) => {
    switch (elem.type) {
      case 'unchanged':
        return `${top(indentStack)}  ${elem.name}: ${elem.value}`;
      case 'changed':
        return `${top(indentStack)}- ${elem.name}: ${elem.valueBefore}\n${top(indentStack)}+ ${elem.name}: ${elem.valueAfter}`;
      case 'deleted':
        return `${top(indentStack)}- ${elem.name}: ${elem.value}`;
      case 'new':
        return `${top(indentStack)}+ ${elem.name}: ${elem.value}`;
      case 'object': {
        const newLocalObj = elem.value;
        const { diff: newDiffList } = newLocalObj;
        const topIndent = top(indentStack);
        indentStack.push(`    ${topIndent}`);
        const objDiff = newDiffList.map(clbFunc).join('\n');
        const result = `  ${topIndent}${elem.name}: {\n${objDiff}\n  ${topIndent}}`;
        indentStack.pop();
        return result;
      }
      case 'newObject': {
        const topIndent = top(indentStack);
        indentStack.push(`    ${topIndent}`);
        const result = `${topIndent}+ ${elem.name}: {\n    ${topIndent}"содержимое объекта, потом напишем"\n  ${topIndent}}`;
        indentStack.pop();
        return result;
      }
      case 'deletedObject': {
        const topIndent = top(indentStack);
        indentStack.push(`    ${topIndent}`);
        const result = `${topIndent}- ${elem.name}: {\n    ${topIndent}"содержимое объекта, потом напишем"\n  ${topIndent}}`;
        indentStack.pop();
        return result;
      }
      default:
        return null;
    }
  };
  return `{\n${diffList.map(clbFunc).join('\n')}\n}\n`;
};

console.log(stylish(diffresult));
// export default stylish;
