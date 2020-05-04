import genDiff from '../dist/index.js';

test('genDiffJson', () => {
  const pathToFile1 = `${__dirname}/../__fixtures__/before.json`;
  const pathToFile2 = `${__dirname}/../__fixtures__/after.json`;
  const result = genDiff(pathToFile1, pathToFile2);
  expect(result).toEqual(`{
   host: hexlet.io
 - timeout: 50
 + timeout: 20
 - proxy: 123.234.53.22
 - follow: false
 + verbose: true
}`);
});

test('genDiffYml', () => {
  const pathToFile1 = `${__dirname}/../__fixtures__/before.yml`;
  const pathToFile2 = `${__dirname}/../__fixtures__/after.yml`;
  const result = genDiff(pathToFile1, pathToFile2);
  expect(result).toEqual(`{
   host: hexlet.io
 - timeout: 50
 + timeout: 20
 - proxy: 123.234.53.22
 - follow: false
 + verbose: true
}`);
});

test('genDiffIni', () => {
  const pathToFile1 = `${__dirname}/../__fixtures__/before.ini`;
  const pathToFile2 = `${__dirname}/../__fixtures__/after.ini`;
  const result = genDiff(pathToFile1, pathToFile2);
  expect(result).toEqual(`{
   host: hexlet.io
 - timeout: 50
 + timeout: 20
 - proxy: 123.234.53.22
 - follow: false
 + verbose: true
}`);
});
