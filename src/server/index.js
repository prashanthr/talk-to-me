import express from  'express'
import http from 'http'
import path from 'path'
import config from 'config'
import _debug from 'debug'
var debug = _debug('server')

var app = express()
app.use(express.static(path.join(__dirname, '/../../build')))

let server = async () => {
  let httpServer = http.Server(app)
  app.use(function (req, res) {
    res.sendfile(path.join(__dirname, '/../../build', 'index.html'))
  })
  httpServer.listen(9095, function () {
    debug('Server running on 9095')
  })
}
server()

