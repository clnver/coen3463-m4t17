var express = require('express');
var router = express.Router();

/* GET view page. */
router.get('/', function(req, res, next) {
  res.render('view');
});

module.exports = router;