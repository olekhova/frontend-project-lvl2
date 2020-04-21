#!/usr/bin/env node

import { Command } from 'commander';
import genDiff from '../genDiff';

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

