const Controller = require("../core/lib/Controller");

class DocsController extends Controller {
  main(req, res, next) {
    res.send("New controller was created");

    if (next) {
      // Middleware
      next(); // Continue stack
    } else {
      // Controller
      res.end(); // End stack
    }
  }
}

const docsController = new DocsController();

module.exports = docsController;
