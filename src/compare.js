import { has, isObject, union } from 'lodash';

const createElement = (type, name, value) => ({ type, name, value });
const createElementChanged = (type, name, valueBefore, valueAfter) => ({
  type, name, valueBefore, valueAfter,
});
const createElementChildren = (type, name, children) => ({ type, name, children });
const isKeyInTwoObjects = (key, object1, object2) => {
  if (has(object1, key) && has(object2, key)) return true;
  return false;
};
const areValuesNotObjects = (value1, value2) => {
  if (!isObject(value1) && !isObject(value2)) return true;
  return false;
};
const areValuesEqual = (value1, value2) => value1 === value2;
const isOneOfTheValuesObject = (value1, value2) => {
  if ((!isObject(value1) && isObject(value2))
   || (isObject(value1) && !isObject(value2))) return true;
  return false;
};

const compare = (firstObject, secondObject) => {
  const keysOfFirstObject = Object.keys(firstObject);
  const keysOfSecondObject = Object.keys(secondObject);
  const keysOfTwoObject = union(keysOfFirstObject, keysOfSecondObject);
  const ast = keysOfTwoObject.map((key) => {
    if (isKeyInTwoObjects(key, firstObject, secondObject)) {
      if (areValuesNotObjects(firstObject[key], secondObject[key])) {
        return areValuesEqual(firstObject[key], secondObject[key])
          ? createElement('unchanged', key, firstObject[key])
          : createElementChanged('changed', key, firstObject[key], secondObject[key]);
      }
      if (isOneOfTheValuesObject(firstObject[key], secondObject[key])) return createElementChanged('changed', key, firstObject[key], secondObject[key]);
      return createElementChildren('object', key, compare(firstObject[key], secondObject[key]));
    }
    if (has(firstObject, key)) return createElement('deleted', key, firstObject[key]);
    return createElement('new', key, secondObject[key]);
  });
  return ast;
};

export default compare;
