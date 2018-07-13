const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  "userId": String,
  "userName": String,
  "userPwd": Number,
  "oderList": Array,
  "cartList": [
    {
      "productId": String,
      "productName": String,
      "salePrice": String,
      "productImage": String,
      "checked": String,
      "productNum": String
    }
  ],
  "addressList": Array

})

module.exports = mongoose.model('User', userSchema) // users是集合的名字
