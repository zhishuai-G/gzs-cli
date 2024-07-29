import download from 'download-git-repo';
import ora from 'ora';
import fs from 'fs';
 
const spinner = ora('下载中...');
 
/**
 * @description: 检查路径是否存在
 * @param {String} path 路径
 * @return {Boolean}
 */
export function checkPath(path) {
  if (fs.existsSync(path)) {
    return true
  } else {
    return false
  }
}
 
/**
 * @description: 下载git仓库
 * @param {String} branch 分支
 * @param {String} projectName 项目名称
 * @return {Promise}
 */
export function downloadGit(branch, projectName) {
  const url = `direct:https://gitee.com/chinafaker/vue-template.git#${branch}`;
  return new Promise((resolve, reject) => {
    spinner.start(); // 开始加载
    download(url, projectName, { clone: true }, err => {
      if (err) {
        reject(err);
      } else {
        resolve();
        spinner.succeed('下载完成')
      }
    });
  });
}