#!/usr/bin/env node

import { Command } from 'commander';
import compare from '../compare';

const program = new Command();
program.version('0.0.1');
program
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig) => {
    console.log(compare(firstConfig, secondConfig));
  })
  .parse(process.argv);

