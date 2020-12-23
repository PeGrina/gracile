const self = {
  callback: null,
  getConfig: null,
  dirname: null
}
const path = require('path');

module.exports = class Controller {
  constructor(callback) {
    self.callback = callback;
    self.getConfig = this.getConfig;
    self.dirname = path.join(__dirname, '..', '..');
    console.log(self);
  }

  getConfig(name) {
    return require(path.join(
      self.dirname,
      "config",
      name + ".config.js"
    ));
  }

  middleware(req, res, next) {
    return self.callback(req, res, next, self);
  }

  controller(req, res) {
    return self.callback(req, res, false, self);
  }
}