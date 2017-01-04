var controller = require('./../controllers');
var router = require('express').Router();

router.get('/', function(req, res) {
  res.sendfile('../client/build/');
});
