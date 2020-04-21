import fs from 'fs';
import { has, reduce } from 'lodash';

const compare = (pathToFirstFile, pathToSecondFile) => {
  const firstFile = JSON.parse(fs.readFileSync(pathToFirstFile));
  const secondFile = JSON.parse(fs.readFileSync(pathToSecondFile));
  //console.log (firstFile , secondFile);
  // const keysOfFirstFile = Object.keys(firstFile);
  // const keysOfSecondFile = Object.keys(secondFile);
  // console.log (keysOfFirstFile, keysOfSecondFile);
  const entriesOfFirstFile = Object.entries(firstFile);
  const entriesOfSecondFile = Object.entries(secondFile);

  const result1 = reduce( entriesOfFirstFile, (acc, kv) => {
    if (has(secondFile, kv[0]) && (kv[1] === secondFile[kv[0]])) {
      return `${acc} \n   ${kv[0]} : ${kv[1]}`;
    }
    if (has(secondFile, kv[0]) && (kv[1] !== secondFile[kv[0]])) {
      return `${acc} \n - ${kv[0]} : ${kv[1]} \n + ${kv[0]} : ${secondFile[kv[0]]}`;
    }
    if (!has(secondFile, kv[0])) {
      return `${acc} \n - ${kv[0]} : ${kv[1]}`;
    }
    return acc;
  }, '');

  const result = reduce( entriesOfSecondFile, (acc, kv) => {
    if (!has(firstFile, kv[0])) {
      return `${acc} \n + ${kv[0]} : ${kv[1]}`;
    }
    return acc;
  }, result1);
return `{${result} \n}`;
};



export default compare;