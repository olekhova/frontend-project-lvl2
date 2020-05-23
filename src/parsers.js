import yaml from 'js-yaml';
import ini from 'ini';
import { isObject } from 'lodash';

const cureIni = (obj) => {
  if (typeof obj === 'string') {
    const objNum = +obj;
    if (!Number.isNaN(objNum)) return objNum;
  }
  if (!isObject(obj)) return obj;
  return Object.entries(obj).reduce((acc, [key, value]) => ({
    ...acc, [key]: cureIni(value),
  }), {});
};

const getParser = (extName) => {
  if (extName === '.json') {
    return JSON.parse;
  }
  if (extName === '.yml') {
    return yaml.safeLoad;
  }
  if (extName === '.ini') {
    // return ini.parse;
    return (s) => cureIni(ini.parse(String(s)));
  }
  return null;
};

export default getParser;
