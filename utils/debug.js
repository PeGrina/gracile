const { webConfig } = require('../config/config');
const { logger } = webConfig.config.components;

logger.info('g');

module.exports = (req, res, next) => {
  logger.debug('Request on: ' + req.url);
  next();
}
