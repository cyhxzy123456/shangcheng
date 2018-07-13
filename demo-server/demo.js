
/* let user = require('./user')

console.log(`userName:${user.userName}`)
console.log(`sayHey:${user.say()}`) */

let http = require('http')
let url = require ('url')//专门解析请求的头
let util =require('util')


let server = http.createServer((req, res) => {
  res.statusCode = 200

  res.setHeader("Content-Type", "text/plain; charset=utf-8")

  // util.inspect() // 把对象中的每个key value值转换成字符串，用于调试
  res.end(util.inspect(url.parse(req.url)) )
})
server.listen(8000, '127.0.0.1', () => {
  console.log('请打开http://127.0.0.1:3000/访问')
})

