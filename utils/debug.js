const webConfig = require("../config/web.config");
const { logger } = webConfig.components;

module.exports = (req, res, next) => {
  logger.debug("Request on: " + req.url);
  next();
};
