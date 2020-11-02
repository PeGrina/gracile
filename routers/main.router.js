/**
 * @module Main Router
 * @desc Main router of server
 * */
// Declaring router
const Router = require('express').Router();
const path = require('path');
const splitedDir = __dirname.split(path.sep);
const parentDir = splitedDir.slice(0, splitedDir.length-1).join(path.sep);
const pkjson = require('../package.json');
const navigation = [
  { href: '/', title: 'Home', active: true },
  { href: '/info', title:'Information', active: false }
];

// Router methods
Router.all('/', (req,res)=>{
    res.render('index', { navigation: navigation });
})

Router.all('/info', (req, res)=>{
  res.render('info', {
    navigation: navigation,
    pkg: pkjson,
    config: require('../config/config').webConfig
  })
})

// Exports
module.exports = Router;
