import { isObject } from 'lodash';

// const top = (stack) => stack[stack.length - 1];

const getValue = (obj, topIndent, indent) => {
  if (!isObject(obj)) {
    return `${obj}`;
  }
  const prettyPrintObject = (o, i) => Object.entries(o).reduce((acc, [k, v]) => {
    if (isObject(v)) {
      return [...acc, `${i}${k}: {`, ...prettyPrintObject(v, `${indent}${i}`), `${i}}`];
    }
    return [...acc, `${i}${k}: ${v}`];
  }, []);
  const inner = [...prettyPrintObject(obj, indent)].map((l) => `${topIndent}     ${l}\n`).join('');
  return `{\n${inner}${topIndent}  }`;
};

const stylish = (diffList) => {
  const iter = (localDiffList, indent, indentStep) => localDiffList
    .map((elem) => {
      switch (elem.type) {
        case 'unchanged': return `${indent}  ${elem.name}: ${getValue(elem.value, indent, indent)}`;
        case 'changed': return `${indent}- ${elem.name}: ${getValue(elem.valueBefore, indent, indent)}\n${indent}+ ${elem.name}: ${getValue(elem.valueAfter, indent, indent)}`;
        case 'deleted': return `${indent}- ${elem.name}: ${getValue(elem.value, indent, indent)}`;
        case 'added': return `${indent}+ ${elem.name}: ${getValue(elem.value, indent, indent)}`;
        case 'object': {
          const newDiffList = elem.children;
          const newIndent = `${indent}${indentStep}`;
          return `${indent}  ${elem.name}: {\n${iter(newDiffList, newIndent)}\n${indent}}`;
        }
        default:
          throw new Error(`Unknown element type: '${elem.type}'!`);
      }
    }).join('\n');
  const result = `{\n${iter(diffList, '', '  ')}\n}`;
  console.log(result);
  return result;
};

// const stylishOld = (diffList) => {
//   const indentStack = [];
//   indentStack.push('  ');
//   const clbFunc = (element) => {
//     const topIndent = top(indentStack);
//     const elemToString = (elem) => {
//       switch (elem.type) {
//         case 'unchanged': return `${topIndent}  ${elem.name}: ${getValue(elem.value, topIndent, ' ')}`;
//         case 'changed': return `${topIndent}- ${elem.name}: ${getValue(elem.valueBefore, topIndent, ' ')}\n${topIndent}+ ${elem.name}: ${getValue(elem.valueAfter, topIndent, ' ')}`;
//         case 'deleted': return `${topIndent}- ${elem.name}: ${getValue(elem.value, topIndent, ' ')}`;
//         case 'added': return `${topIndent}+ ${elem.name}: ${getValue(elem.value, topIndent, ' ')}`;
//         case 'object': {
//           const objDiff = elem.children.map(clbFunc).join('\n');
//           return `  ${topIndent}${elem.name}: {\n${objDiff}\n  ${topIndent}}`;
//         }
//         default:
//           throw new Error(`Unknown element type: '${elem.type}'!`);
//       }
//     };
//     indentStack.push(`    ${topIndent}`);
//     const result = elemToString(element);
//     indentStack.pop();
//     return result;
//   };
//   return `{\n${diffList.map(clbFunc).join('\n')}\n}`;
// };

export default stylish;
