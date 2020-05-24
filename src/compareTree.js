import { has, isObject } from 'lodash';

const createElement = (type, name, value) => ({ type, name, value });
const createElementChanged = (type, name, valueBefore, valueAfter) => ({
  type, name, valueBefore, valueAfter,
});
const createElementChildren = (type, name, children) => ({ type, name, children });

const compareTree = (firstObject, secondObject) => {
  const entriesOfFirstObject = Object.entries(firstObject);
  const entriesOfSecondObject = Object.entries(secondObject);
  const pass1 = entriesOfFirstObject
    .map(([key, value]) => {
      /* Ключи совпали */
      if (has(secondObject, key)) {
        /* Оба значения - не объекты */
        if (!isObject(value) && !isObject(secondObject[key])) {
          if (value === secondObject[key]) {
            return createElement('unchanged', key, value);
          }
          return createElementChanged('changed', key, value, secondObject[key]);
        }
        /* Первое значени - поле, второе - объект (или наоборот) */
        if ((!isObject(value) && isObject(secondObject[key]))
        || (isObject(value) && !isObject(secondObject[key]))) {
          return createElementChanged('changed', key, value, secondObject[key]);
        }
        /* Оба значения - объекты */
        return createElementChildren('object', key, compareTree(value, secondObject[key]));
      }
      /* Ключа нет во втором объекте */
      return createElement('deleted', key, value);
    });
  const pass2 = entriesOfSecondObject
    .filter(([key]) => !has(firstObject, key))
    .map(([key, value]) => createElement('new', key, value));
  const result = pass1.concat(pass2);
  return result;
};

export default compareTree;
