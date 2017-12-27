'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const loggerpac = require('morgan');
const router = express.Router();
var request = require('request');

var logger;
var Promise = require('bluebird');
var log4js = require('log4js');
// var config = require('config');


module.exports = router;

app.use(bodyParser.json());


const port = process.env.PORT || 3001;
app.listen(port);

app.use(bodyParser.json());
app.use(loggerpac('dev'));

require('./routes')(router);
app.use('/', router);

app.use(bodyParser.urlencoded({ extended: true }));
console.log(`App Runs on ${port}`);

