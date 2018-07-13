var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('l am user');
});

router.get('/login', function(req, res, next) {
  res.send('l am user');
});

module.exports = router;
