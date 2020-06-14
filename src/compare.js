import { has, isObject, union } from 'lodash';

const createElement = (type, name, value) => ({ type, name, value });
const createElementChanged = (type, name, valueBefore, valueAfter) => ({
  type, name, valueBefore, valueAfter,
});
const createElementChildren = (type, name, children) => ({ type, name, children });

const compare = (firstObject, secondObject) => {
  const keysOfFirstObject = Object.keys(firstObject);
  const keysOfSecondObject = Object.keys(secondObject);
  const keysOfTwoObjects = union(keysOfFirstObject, keysOfSecondObject);
  return keysOfTwoObjects.map((key) => {
    if (has(firstObject, key) && !has(secondObject, key)) return createElement('deleted', key, firstObject[key]);
    if (!has(firstObject, key) && has(secondObject, key)) return createElement('new', key, secondObject[key]);
    if (firstObject[key] === secondObject[key]) return createElement('unchanged', key, firstObject[key]);
    if (!isObject(firstObject[key]) || !isObject(secondObject[key])) return createElementChanged('changed', key, firstObject[key], secondObject[key]);
    return createElementChildren('object', key, compare(firstObject[key], secondObject[key]));
  });
};

export default compare;
