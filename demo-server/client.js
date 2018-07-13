let util = require('util')
let http = require('http')

// 请求第三方服务的时候就是一个客户端,这里是get方式，也可以是post方式
http.get(" http://www.imooc.com/u/card ", (res) => {
  let data = ''
  res.on('data', (chunk) => {
    data += chunk
  })
  res.on('end', () => {
    let result = JSON.parse(data)
    console.log("result:" + util.inspect(result))
  })
})
