import yaml from 'js-yaml';

const getParser = (extName) => {
  if (extName === '.json') {
    return JSON.parse;
  }
  if (extName === '.yml') {
    return yaml.safeLoad;
  }
  return null;
};

export default getParser;
