var express = require('express');
var path = require('path');
var router = express.Router();
var Course = require('../services/mongoService');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../public/index.html'))
});

router.get('/courses', function(req, res, next) {
  Course.find({}, function(err, courses) {
    if (err) res.json(200,{error: err});
    res.json(200,courses);
  });
});

module.exports = router;
