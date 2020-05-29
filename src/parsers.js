import yaml from 'js-yaml';
import ini from 'ini';
import { isObject, isString } from 'lodash';

const convertNumericString = (obj) => {
  if (isString(obj)) {
    const objNum = +obj;
    if (!Number.isNaN(objNum)) return objNum;
  }
  if (!isObject(obj)) return obj;
  return Object.entries(obj).reduce((acc, [key, value]) => ({
    ...acc, [key]: convertNumericString(value),
  }), {});
};

const getParser = (parserType) => {
  switch (parserType) {
    case 'json': return JSON.parse;
    case 'yml': return yaml.safeLoad;
    case 'ini': return (s) => convertNumericString(ini.parse(s));
    default: {
      throw new Error(`Unknown parser type: '${parserType}'!`);
    }
  }
};
export default getParser;
