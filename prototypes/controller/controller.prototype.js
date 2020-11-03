const Controller = require('../core/lib/Controller');

class {name}Controller extends Controller{
  main(req, res, next){
    res.send('New controller was created');

    if(next){ // Middleware
      next();  // Continue stack
    }else{ // Controller
      res.end(); // End stack
    }
  }
}

const {name2}Controller = new {name}Controller();

module.exports = {name2}Controller;
