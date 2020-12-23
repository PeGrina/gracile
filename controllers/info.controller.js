const Controller = require('../core/lib/Controller');
const pkjson = require('../package.json');

const callback = (req, res, next, obj) => {
  return res.render('info', {
    navigation: obj.getConfig('navigation'),
    pkg: pkjson,
    config: obj.getConfig('web')
  });
  if (next) {
    // Middleware
    next(); // Continue stack
  } else {
    // Controller
    return res.end(); // End stack
  }
}

class InfoController extends Controller {}

const infoController = new InfoController(callback);

module.exports = infoController;
