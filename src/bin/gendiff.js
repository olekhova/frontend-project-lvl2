#!/usr/bin/env node

import { Command } from 'commander';
import genDiff from '../index.js';

const program = new Command();
program.version('0.0.1');
program
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig) => {
    console.log(genDiff(firstConfig, secondConfig));
  })
  .parse(process.argv);

//   #!/usr/bin/env node

// import program from 'commander';
// import gendiff from '../index';

// program
//   .description('Compares two configuration files and shows a difference.')
//   .version('0.1.0')
//   .option('-f, --format [insert, plain, json]', 'output format')
//   .arguments('<firstConfig> <secondConfig>')
//   .action((firstConfig, secondConfig) => {
//     const useFormat = program.format;
//     console.log(gendiff(firstConfig, secondConfig, useFormat));
//   });


// program.parse(process.argv);
