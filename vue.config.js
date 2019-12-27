const path = require('path');

function resolve (dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  chainWebpack: (config) => { // 配置路径别名
    config.resolve.alias
      .set('styles', resolve('src/assets/styles'))
      .set('js', resolve('src/assets/js'))
      .set('img', resolve('src/assets/img'))
      .set('utils', resolve('src/utils'))
      .set('models', resolve('src/models'))
      .set('components', resolve('src/components'))
  }
};
