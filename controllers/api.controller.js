const Controller = require('../core/lib/Controller');

const callback = (req, res, next, obj) => {
  res.send('New controller was created');

  if(next){ // Middleware
    next();  // Continue stack
  }else{ // Controller
    res.end(); // End stack
  }
}

class ApiController extends Controller{}

const apiController = new ApiController(callback);

module.exports = apiController;
