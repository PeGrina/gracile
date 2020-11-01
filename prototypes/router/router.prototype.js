/**
 * @module {name} Router
 * @desc {name} router of server
 * */
// Declaring router
const Router = require('express').Router();

// Router methods
Router.all('/', (req, res)=>{
  res.send('New router');
});

// Export
module.exports = Router;
