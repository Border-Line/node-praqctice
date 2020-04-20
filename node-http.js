let http = require('http')
let fs = require('fs')
let port = require('./port').port
// parse url
let url = require('url')

// create server
let server = http.createServer(function (request, response) {
  let path = url.parse(request.url).pathname
  // set reponse header
  response.writeHead(200, { 'Content-Type': 'text/html' })
  // response page
  let html = router(path)
  // set response
  response.end(html)
})

// get file
const router = (path) => {
  const defaultPage = 'a.html'
  let rMap = {
    '/a': 'a.html',
    '/b': 'b.html',
  }
  let toPath = rMap[path] || defaultPage
  return fs.readFileSync(`page/${toPath}`)
}

// listen
server.listen(port)
