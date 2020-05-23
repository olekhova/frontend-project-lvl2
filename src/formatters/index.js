import stylish from './stylish';
import plain from './plain';
import json from './json';

const getFormatter = (formatter) => {
  if (formatter === 'plain') {
    return plain;
  }
  if (formatter === 'json') {
    return json;
  }
  return stylish;
};

export default getFormatter;
