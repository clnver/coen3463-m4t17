var express = require('express');
var router = express.Router();

/* GET update page. */
router.get('/', function(req, res, next) {
  res.render('update');
});

module.exports = router;