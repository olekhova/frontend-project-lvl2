import stylish from './stylish';
import plain from './plain';

const getFormatter = (formatter) => {
  if (formatter === 'plain') {
    return plain;
  }
  return stylish;
};

export default getFormatter;
