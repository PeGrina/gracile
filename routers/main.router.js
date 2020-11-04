/**
 * @module Main Router
 * @desc Main router of server
 * */
// Declaring router
const Router = require('express').Router()
const path = require('path')
const splitedDir = __dirname.split(path.sep)
const parentDir = splitedDir.slice(0, splitedDir.length - 1).join(path.sep)
// eslint-disable-next-line no-unused-vars
const pkjson = require('../package.json')

// Router methods
Router.all('/', require('../controllers/index.controller').controller)

Router.all('/info', require('../controllers/info.controller').controller)

// Exports
module.exports = Router
