const Controller = require('../core/lib/Controller');

const callback = (req, res, next, obj) => {
  return res.render('index', {
    navigation: obj.getConfig('navigation')
  });
  if (next) {
    // Middleware
    next(); // Continue stack
  } else {
    // Controller
    res.end(); // End stack
  }
}

class IndexController extends Controller {}

const indexController = new IndexController(callback);

module.exports = indexController;
