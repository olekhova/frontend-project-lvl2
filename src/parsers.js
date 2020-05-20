import yaml from 'js-yaml';
import ini from 'ini';

const getParser = (extName) => {
  if (extName === '.json') {
    return JSON.parse;
  }
  if (extName === '.yml') {
    return yaml.safeLoad;
  }
  if (extName === '.ini') {
    // return (s) => ini.decode(String(s));
    return ini.parse;
  }
  return null;
};

export default getParser;
