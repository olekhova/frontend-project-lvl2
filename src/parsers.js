import yaml from 'js-yaml';
import ini from 'ini';

const getParser = (parserType) => {
  switch (parserType) {
    case 'json': return JSON.parse;
    case 'yml': return yaml.safeLoad;
    case 'ini': return ini.parse;
    default: {
      throw new Error(`Unknown parser type: '${parserType}'!`);
    }
  }
};
export default getParser;
