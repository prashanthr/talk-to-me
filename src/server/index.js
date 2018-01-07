import express from 'express'
import http from 'http'
import path from 'path'
import config from 'config'
import cors from 'cors'
import bodyParser from 'body-parser'
import { publicRouter } from './router'
import api from './api'
import _debug from 'debug'
import socketController from './socket'
import io from 'socket.io'
var debug = _debug('server')

var app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json({limit: '0.5mb'}))
// app.use(express.static(path.join(__dirname, '/../../build')))
app.use('/', publicRouter)

let server = async () => {
  let httpServer = http.Server(app)
  app.use(function (req, res) {
    res.sendFile(path.join(__dirname, '/../../build', 'index.html'))
  })
  httpServer.listen(config.port, () => {
    debug(`Server running on ${config.port}`)
    const ioServer = io(httpServer)
    socketController(ioServer)
    // API
    api(app, ioServer)
  })
}
server()
