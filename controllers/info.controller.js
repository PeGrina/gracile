const Controller = require("../core/lib/Controller");
const pkjson = require("../package.json");

class InfoController extends Controller {
  main(req, res, next) {
    res.render("info", {
      navigation: this.getConfig("navigation"),
      pkg: pkjson,
      config: this.getConfig(),
    });
    if (next) {
      // Middleware
      next(); // Continue stack
    } else {
      // Controller
      res.end(); // End stack
    }
  }
}

const infoController = new InfoController();

module.exports = infoController;
