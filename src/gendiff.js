#!/usr/bin/env node
import { Command } from 'commander';
const program = new Command();
program.version('0.0.1');

program
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format <type>', 'output format')
  .parse(process.argv);


  // -f, --format [type]  output format

  // program
  // .version('0.1.0')
  // .arguments('<cmd> [env]')
  // .action(function (cmd, env) {
  //   cmdValue = cmd;
  //   envValue = env;
  // });