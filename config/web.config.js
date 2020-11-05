const log4js = require('log4js');
const db = require('./db.config');
const params = require('./params.config');
const Config = require('../core/lib/Config');

const webOptions = {
  appName: 'Gracile',
  key: 'Z3JhY2lsZQ',
  desc: 'Gracile is progressive framework with open source code.',
  components: {
    db: db,
    logger: {},
    bootstrap: ['log'],
    template: 'twig'
  },
  params: params
};
if (process.env.NODE_ENV === 'development') {
  webOptions.components.bootstrap.push('debug');
}
const logger = log4js.getLogger(webOptions.appName);
logger.level = 'debug';
webOptions.components.logger = logger;

const WebConfig = new Config({
  private: ['key'],
  config: webOptions
});

module.exports = WebConfig;
