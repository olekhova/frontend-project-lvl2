import { has, isObject } from 'lodash';

const createElement = (type, name, value) => ({ type, name, value });
const createElementChanged = (type, name, valueBefore, valueAfter) => ({
  type, name, valueBefore, valueAfter,
});
const createElementChildren = (type, name, children) => ({ type, name, children });

const compare = (firstObject, secondObject) => {
  const keysOfFirstObject = Object.keys(firstObject);
  const keysOfSecondObject = Object.keys(secondObject);
  const pass1 = keysOfFirstObject
    .map((key) => {
      /* Ключи совпали */
      if (has(secondObject, key)) {
        /* Оба значения - не объекты */
        if (!isObject(firstObject[key]) && !isObject(secondObject[key])) {
          if (firstObject[key] === secondObject[key]) {
            return createElement('unchanged', key, firstObject[key]);
          }
          return createElementChanged('changed', key, firstObject[key], secondObject[key]);
        }
        /* Первое значение - поле, второе - объект (или наоборот) */
        if ((!isObject(firstObject[key]) && isObject(secondObject[key]))
          || (isObject(firstObject[key]) && !isObject(secondObject[key]))) {
          return createElementChanged('changed', key, firstObject[key], secondObject[key]);
        }
        /* Оба значения - объекты */
        return createElementChildren('object', key, compare(firstObject[key], secondObject[key]));
      }
      /* Ключа нет во втором объекте */
      return createElement('deleted', key, firstObject[key]);
    });
  const pass2 = keysOfSecondObject
    .filter((key) => !has(firstObject, key))
    .map((key) => createElement('new', key, secondObject[key]));
  const result = pass1.concat(pass2);
  return result;
};

export default compare;
