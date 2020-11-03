class Controller {
  #path = require("path");
  #_dirname = __dirname.split(this.#path.sep);
  #dirname = this.#_dirname.slice(0, this.#_dirname.length - 1);

  getConfig(name) {
    return require(this.#path.join(
      this.#dirname,
      "config",
      name + ".config.js"
    ));
  }

  main(req, res, next) {
    /**
     * Hereditary function
     * */
  }

  middleware(req, res, next) {
    return this.main(req, res, next);
  }

  controller(req, res) {
    return this.main(req, res, false);
  }
}

module.exports = Controller;
