/**
 * @module Server
 * @desc Starting an production or development server.
 * */
// Importing libraries
const express = require('express');
const path = require('path');

// Importing local files
const mainRouter = require('../routers/main.router.js');

// Declaring variables
const app = express();

// Using routers
app.use('/', mainRouter)

// Export
module.exports = app;
