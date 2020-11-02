const Config = require('./config.class');
const webConfig = new Config('./web.config.js');
const dbConfig = new Config('./db.config.js');
const paramsConfig = new Config('./params/config.js');

module.exports = {
  webConfig,
  dbConfig,
  paramsConfig
}
