/**
 * Created by dixu on 2017/8/31.
 */
const fs = require('fs');
const path = require('path');
const lessToJs = require('less-vars-to-js');

module.exports = () => {
  const themePath = path.join(__dirname, './themes/default.less');
  return lessToJs(fs.readFileSync(themePath, 'utf8'));
};
