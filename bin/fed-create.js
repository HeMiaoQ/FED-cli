#!/usr/bin/env node

const program = require('commander')
const inquirer = require('inquirer')
const chalk = require('chalk')
const fse = require('fs-extra')
const path = require('path')

program
  .usage('<project-name>')
program.parse(process.argv)

if (program.args.length < 1) {
  console.info(chalk.red(`Missing required argument ${chalk.yellow('<project-name>')}.`))
  process.exit()
}

const [projectName] = program.args

const prompts = [{
  name: 'templateType',
  type: 'list',
  message: 'choose a template type',
  choices: [
    { name: 'Vue + Vuex + Vant UI', value: 'vue-template-h5-VantUI' }
  ]
}]

;(async () => {
  try {
    const { templateType } = await inquirer.prompt(prompts)
    console.info('创建开始')
    fse.copySync(path.resolve(__dirname, `../template/${templateType}`), path.resolve(process.cwd(), projectName))
    console.info('创建完成')
  } catch (e) {
    console.info(chalk.red(`创建失败：${JSON.stringify(e)}`))
  }
})()
