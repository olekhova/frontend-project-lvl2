import stylish from './stylish';
import plain from './plain';
import json from './json';

const getFormatter = (formatter) => {
  switch (formatter) {
    case 'plain': return plain;
    case 'json': return json;
    default: return stylish;
  }
};

export default getFormatter;
