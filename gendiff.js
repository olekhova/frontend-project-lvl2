#!/usr/bin/env node
const { Command } = require('commander');
const program = new Command();
program.version('0.0.1');

program
  .description('Compares two configuration files and shows a difference.')
  .parse(process.argv);
