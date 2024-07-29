#!/usr/bin/env node
import { program } from 'commander'
import fs from 'fs';
import inquirer from 'inquirer';
import { checkPath, downloadGit } from './util.js';
 
let json = fs.readFileSync('./package.json', 'utf-8')
json = JSON.parse(json)
 
program.version(json.version)
//添加create 命令 和 别名crt 以及描述 以及 执行完成之后的动作
program.command('create <projectName>').alias('ctr').description('Create a new project').action((projectName)=>{
  // 命令行交互工具
  inquirer.prompt([
    {
      type: 'input',
      name: 'projectName',
      message: 'project name',
      default: projectName
    },
    {
      type: 'confirm',
      name: 'isTs',
      message: '是否支持typescript',
    }
  ]).then((res)=>{
    if(checkPath(res.projectName)){
      console.log('项目已存在');
      return
    } 
    if(res.isTs){
      downloadGit('ts', res.projectName)
    } else {
      downloadGit('js', res.projectName)
    }
  })
})
 
program.parse(process.argv)