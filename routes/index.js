var express = require('express');
var router = express.Router();
var debug = require('debug')('app:index')
const mongo = require('mongodb').MongoClient
require('dotenv').config()

/* GET home page. */
router.get('/', function(req, res, next) {
  debug('Got a request from ' + req.ip)
  res.send('🏠 Welcome')
});

module.exports = router;
