let http = require('http')
let fs = require('fs')
let url = require('url')

let app = http.createServer((req, res) => {
  //res.statusCode = 200
  //res.setHeader("Content-Type", "text/palin; charset=utf-8 ")
  const pathname = url.parse(req.url).pathname
  fs.readFile(pathname.substring(1), (err, data) => {
    if (err) {
      res.writeHead(404, {
        'Content-Type': 'text/html'
      })
    } else {
      res.writeHead(200, {
        'Content-Type': 'text/html'
      })
      res.write(data.toString())// 把获取到的内容写入到响应的数据里面
    }
    res.end()// 响应结束，可以传参也可以不传
  })
})
app.listen(3002, '127.0.0.1', () => {
  console.log('已启动')
})
