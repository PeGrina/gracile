const Controller = require('../core/lib/Controller');

const callback = (req, res, next, obj) => {
  return res.send('New controller was created');

  if(next){ // Middleware
    next();  // Continue stack
  }else{ // Controller
    res.end(); // End stack
  }
}

class {name}Controller extends Controller{}

const {name2}Controller = new {name}Controller(callback);

module.exports = {name2}Controller;
