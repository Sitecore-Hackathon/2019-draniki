const path = require('path');
const codeGenTsUtils = require('./../../../../scripts/code-generation/codeGenTsUtils');

module.exports = {
  cwd: path.join(__dirname, '../../'),
  pattern: 'serialization/Templates/**/*.yml',
  modules: [],
  templatePath: path.join(__dirname, 'codegenerationts.tmpl'),
  ToClass: codeGenTsUtils.toClass,
  ToInterface: codeGenTsUtils.toInterface,
  ToProperty: codeGenTsUtils.toProperty,
  ToPropertyType: codeGenTsUtils.toPropertyType,
};
