#!/usr/bin/env node

import { Command } from 'commander';
import genDiff from '../index.js';

const program = new Command();
program.version('0.0.1');
program
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [output format]', 'output format: stylish (default), plain or json', 'stylish')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig) => {
    const textResult = genDiff(firstConfig, secondConfig, program.format);
    console.log(textResult);
  })
  .parse(process.argv);
