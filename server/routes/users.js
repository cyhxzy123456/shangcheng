var express = require('express')
var router = express.Router()

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('l am user')
})
router.get('/login', function (req, res, next) {
  // res.send('l am login')
  // 从客户端拿到传过来的username,和userPwd，并且把这两个作为参数去查数据库
  var User = require('../models/user')
  let param = {
    userName: req.param('userName'),
    userPwd: req.param('userPwd')
  }
  // 拿到username，userPwd后去数据库里面查询是不是有对应的数据
  User.findOne(param, (err, doc) => {
    if (err) {
      res.json({
        status: '1',
        msg: err.message
      })
    } else {
      if (doc) {
      // 把信息存到coookie中
      /* res.cookie('userId', doc.userId, {
          path: '/',
          maxAge: 1000 * 60 * 60
        }) */
        res.json({
          status: '0',
          msg: '',
          result: {
            userName: doc.userName
          }
        })
      }
    }
  })
})
module.exports = router
