import genDiff from '../dist/index.js';

const path = `${__dirname}/../__fixtures__`;
const expected = `{
   host: hexlet.io
 - timeout: 50
 + timeout: 20
 - proxy: 123.234.53.22
 - follow: false
 + verbose: true
}`;

test('genDiffJson', () => {
  const pathToFile1 = `${path}/before.json`;
  const pathToFile2 = `${path}/after.json`;
  const result = genDiff(pathToFile1, pathToFile2);
  expect(result).toEqual(`${expected}`);
});

test('genDiffYml', () => {
  const pathToFile1 = `${path}/before.yml`;
  const pathToFile2 = `${path}/after.yml`;
  const result = genDiff(pathToFile1, pathToFile2);
  expect(result).toEqual(`${expected}`);
});

test('genDiffIni', () => {
  const pathToFile1 = `${path}/before.ini`;
  const pathToFile2 = `${path}/after.ini`;
  const result = genDiff(pathToFile1, pathToFile2);
  expect(result).toEqual(`${expected}`);
});
