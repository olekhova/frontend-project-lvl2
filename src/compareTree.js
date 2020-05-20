import { has, isObject } from 'lodash';

const createElement = (type, name, value) => ({ type, name, value });
const createElementChanged = (type, name, valueBefore, valueAfter) => ({
  type, name, valueBefore, valueAfter,
});

const compareTree = (firstObject, secondObject) => {
  const entriesOfFirstObject = Object.entries(firstObject);
  const entriesOfSecondObject = Object.entries(secondObject);
  const pass1 = entriesOfFirstObject
    .map((keyValue) => {
      /* Ключи совпали */
      if (has(secondObject, keyValue[0])) {
        /* Оба значения - не объекты */
        if (!isObject(keyValue[1]) && !isObject(secondObject[keyValue[0]])) {
          if (keyValue[1] === secondObject[keyValue[0]]) {
            return createElement('unchanged', keyValue[0], keyValue[1]);
          }
          return createElementChanged('changed', keyValue[0], keyValue[1], secondObject[keyValue[0]]);
        }
        /* Первое значени - поле, второе - объект (или наоборот) */
        if ((!isObject(keyValue[1]) && isObject(secondObject[keyValue[0]]))
        || (isObject(keyValue[1]) && !isObject(secondObject[keyValue[0]]))) {
          return createElementChanged('changed', keyValue[0], keyValue[1], secondObject[keyValue[0]]);
        }
        /* Оба значения - объекты */
        return createElement('object', keyValue[0], compareTree(keyValue[1], secondObject[keyValue[0]]));
      }
      /* Ключа нет во втором объекте */
      return createElement('deleted', keyValue[0], keyValue[1]);
    });
  const pass2 = entriesOfSecondObject
    .filter((keyValue) => !has(firstObject, keyValue[0]))
    .map((keyValue) => createElement('new', keyValue[0], keyValue[1]));
  const result = pass1.concat(pass2);
  return result;
};

export default compareTree;
