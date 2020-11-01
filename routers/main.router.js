/**
 * @module Main Router
 * @desc Main router of server
 * */
// Declaring router
const Router = require('express').Router();

// Router methods
Router.all('/', (req, res)=>{
    res.send('<h1>Hello from gracile and bye! </h1>');
});

// Exports
module.exports = Router;
