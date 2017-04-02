import express from  'express'
import http from 'http'
import path from 'path'
import config from 'config'
import { ExpressPeerServer } from 'peer'
import cors from 'cors'
import _debug from 'debug'
var debug = _debug('server')

var app = express()
app.use(cors())
app.use(express.static(path.join(__dirname, '/../../build')))

let server = async () => {
  let httpServer = http.Server(app)
  app.use(function (req, res) {
    res.sendFile(path.join(__dirname, '/../../build', 'index.html'))
  })
  app.use('/peerjs', ExpressPeerServer(httpServer, { debug: true }))
  httpServer.on('connection', (id) => { 
    debug('Peer connected')
  })
  httpServer.on('disconnect', (id) => { 
    debug('Peer disconnected')
  })
  httpServer.listen(config.port, () => {
    debug(`Server running on ${config.port}`)
  })
}
server()
