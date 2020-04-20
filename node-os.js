let port = require('./port').port
let os = require('os')
let http = require('http')
let WebSocketServer = require('ws').Server
let fs = require('fs')

var ws = new WebSocketServer({
  port: 8001, //监听的端口
})

ws.on('connection', function (wsocket) {
  //获取的websocket对象，在这里可理解为一个连接，一般来说，你需要把它存起来，一般是存进一个数组，以便于对连接的管理
  wsocket.on('message', (message) => {
    setInterval(() => {
      wsocket.send(
        JSON.stringify({
          date: new Date(),
          tmpdir: os.tmpdir(), //返回操作系统的默认临时文件夹。
          uptime: os.uptime(),
          endianness: os.endianness(), //返回 CPU 的字节序，可能的是 "BE" 或 "LE"。
          hostname: os.hostname(), //返回操作系统的主机名。
          type: os.type(), //返回操作系统名
          platform: os.platform(), //返回操作系统名
          arch: os.arch(), //返回操作系统 CPU 架构，可能的值有 "x64"、"arm" 和 "ia32"。
          release: os.release(), //返回操作系统的发行版本。
          loadavg: os.loadavg(), //返回一个包含 1、5、15 分钟平均负载的数组。
          totalmem: os.totalmem(), //返回系统内存总量，单位为字节
          freemem: os.freemem(), //返回操作系统空闲内存量，单位是字节。
        })
      )
    }, 1000)
  })
  wsocket.on('close', (close) => {
    console.log(close)
  })
  wsocket.on('error', (error) => {
    console.log(error)
  })
  wsocket.on('open', (open) => {
    console.log(open)
  })
})

// create server
let server = http.createServer(function (request, response) {
  // set reponse header
  response.writeHead(200, { 'Content-Type': 'text/html' })
  // res
  let html = fs.readFileSync(`page/ws.html`)
  response.end(html)
})

server.listen(port)
