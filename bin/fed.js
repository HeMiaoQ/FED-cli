#!/usr/bin/env node

const program = require('commander')

program
  .version(require('../package.json').version)
  .usage('<command>')
  .command('create <project-name>', 'create a new project template')

program.parse(process.argv)