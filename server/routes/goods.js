const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const Goods = require('../models/goods')

mongoose.connect('mongodb://127.0.0.1:27017/dumall', { useNewUrlParser: true })
mongoose.connection.on('connected', function () { // 监听链接成功
  console.log('mongodb connect success')
})
mongoose.connection.on('error', function () { // 监听报错
  console.log('mongodb connect fail')
})
mongoose.connection.on('disconnected', function () { // 监听断开时的响应
  console.log('mongodb connect disconnected')
})
/* 查询商品列表 */
router.get('/', function (req, res, next) {
  let priceGt = ''
  let priceLte = ''
  let priceLevel = req.param('priceLevel')
  var page = parseInt(req.param('page'))
  const pageSize = parseInt(req.param('pageSize'))
  const sort = req.param('sort')// sort=1是升序，sort = -1 是降序
  let skip = (page - 1) * pageSize
  let params = {}
  if (priceLevel !== 'all') {
    priceLevel = parseInt(req.param('priceLevel'))
    switch (priceLevel) {
      case 0:
        priceGt = 0;
        priceLte = 100;
        break
      case 1:
        priceGt = 100;
        priceLte = 500;
        break
      case 2:
        priceGt = 500;
        priceLte = 1000;
        break
      case 3:
        priceGt = 1000;
        priceLte = 5000;
        break
    }
    params = { // 查询数据
      salePrice: {
        $gt: priceGt,
        $lte: priceLte
      }
    }
  }
  let goodsModel = Goods.find(params).skip(skip).limit(pageSize)
  goodsModel.sort({'salePrice': sort})
  goodsModel.exec(function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message
      })
    } else {
      if (doc) {
        res.json({
          status: '0',
          msg: '',
          result: {
            count: doc.length,
            list: doc
          }
        })
      }
    }
  })
})
// 加入到购物车
router.post('/addCart', function (req, res, next) {
  let userId = '100000077'
  let productId = req.body.productId // 如果是用get取参就用req.param(productId),用post就用req.body.productId
  const User = require('../models/user') // 拿到数据模型

  User.findOne({userId: userId}, function (err, userDoc) { // 通过userId找到对应的文档
    if (err) {
      res.json({
        status: '1',
        msg: err.message
      })
    } else {
      console.log(userDoc)
      if (userDoc) { // 如果根据userId找到了对应的文档内容，再根据productId去找对应的内容
        let goodsItem = ''
        userDoc.cartList.forEach(function (item) {
          if (item.productId == productId) { // 获取到userdoc后，判断此时前端传过来的productid是不是已经存在，如果已经存在就让数量加1，如果不存在才插入到cartlist里去
            goodsItem = item // item就是一个商品信息，goodsItem只是用来把这个信息保存，方便下一步的判断
            item.productNum ++
          }
        })
        if (goodsItem) { // 如果这一条商品信息已经存在就把数量加1，和上面的差不多
          userDoc.save(function (err2, doc2) {
            if (err2) {
              res.json({
                status: '1',
                msg: err2.message
              })
            } else {
              res.json({
                status: '0',
                msg: '',
                result: 'suc'
              })
            }
          })
        } else {
          Goods.findOne({productId: productId}, function (err1, doc) {
            if (err1) {
              res.json({
                status: '1',
                msg: err1.message
              })
            } else {
              if (doc) { // 如果根据productId也找到了对应的内容
                doc.productNum = 1
                doc.checked = 1
                userDoc.cartList.push(doc) // 把根据productId找到的商品内容push到cartlist里面
                userDoc.save(function (err2, doc2) {
                  if (err2) {
                    res.json({
                      status: '1',
                      msg: err2.message
                    })
                  } else {
                    res.json({
                      status: '0',
                      msg: '',
                      result: 'suc'
                    })
                  }
                })
              }
            }
          })
        }
      }
    }
  })
})
module.exports = router
