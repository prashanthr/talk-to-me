import express from  'express'
import http from 'http'
import path from 'path'
import config from 'config'
import { ExpressPeerServer } from 'peer'
import _debug from 'debug'
var debug = _debug('server')

var app = express()
app.use(express.static(path.join(__dirname, '/../../build')))

let server = async () => {
  let httpServer = http.Server(app)
  app.use(function (req, res) {
    res.sendfile(path.join(__dirname, '/../../build', 'index.html'))
  })
  app.use('/peer', ExpressPeerServer(httpServer, { debug: true }))
  httpServer.listen(config.port, () => {
    debug(`Server running on ${config.port}`)
  })
}
server()
