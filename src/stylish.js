const diffresult = {
  diff: [
    {
      type: 'unchanged',
      name: 'host',
      value: 'hexlet.io',
    },
    {
      type: 'changed',
      name: 'timeout',
      valueBefore: 50,
      valueAfter: 20,
    },
    {
      type: 'deleted',
      name: 'proxy',
      value: '123.234.53.22',
    },
    {
      type: 'deleted',
      name: 'follow',
      value: false,
    },
    {
      type: 'new',
      name: 'verbose',
      value: true,
    },
    {
      type: 'Object',
      name: 'obj',
      value: {
        diff: [
          {
            type: 'unchanged',
            name: 'verbose2',
            value: true,
          },
          {
            type: 'new',
            name: 'verbose5',
            value: true,
          },
          {
            type: 'changed',
            name: 'timeout5',
            valueBefore: 5700,
            valueAfter: 2066,
          },
        ],
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
      case 'Object': {
        const newLocalObj = elem.value;
        const { diff: newDiffList } = newLocalObj;
        const topIndent = top(indentStack);
        indentStack.push(`    ${topIndent}`);
        const objDiff = newDiffList.map(clbFunc).join('\n');
        const result = `  ${topIndent}${elem.name}: {\n${objDiff}\n  ${topIndent}}`;
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
