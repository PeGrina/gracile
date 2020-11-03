const Controller = require("../core/lib/Controller");

class IndexController extends Controller {
  main(req, res, next) {
    res.render("index", {
      navigation: this.getConfig("navigation"),
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

const indexController = new IndexController();

module.exports = indexController;
