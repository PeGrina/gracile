/**
 * @module Server
 * @desc Starting an production or development server.
 * */
// Importing libraries
const express = require('express')
const path = require('path')
const Twig = require('twig')
const _ = require('lodash')

// Importing local files
const debug = require('../utils/debug.js')
const mainRouter = require('../routers/main.router.js')
const webConfig = require('../config/web.config')

// Declaring variables
const app = express()
const splitedDir = __dirname.split(path.sep)
const parentDir = splitedDir.slice(0, splitedDir.length - 1).join(path.sep)

// Static
app.set('view engine', 'twig')
app.use(express.static(path.join(parentDir, 'public')))

// Using routers
app.locals.renderOptions = {
  config: webConfig
}
app.use(debug)
app.use('/', mainRouter)

// Export
module.exports = app
