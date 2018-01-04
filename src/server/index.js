import express from  'express'
import http from 'http'
import path from 'path'
import config from 'config'
import { ExpressPeerServer } from 'peer'
import cors from 'cors'
import axios from 'axios'
import bodyParser from 'body-parser'
import { publicRouter } from './router'
import api from './api'
import _debug from 'debug'
var debug = _debug('server')

var app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json({limit: '0.5mb'}))
// app.use(express.static(path.join(__dirname, '/../../build')))
app.use('/', publicRouter)

// API
api(app)

let server = async () => {
  let httpServer = http.Server(app)
  app.use(function (req, res) {
    res.sendFile(path.join(__dirname, '/../../build', 'index.html'))
  })
  // app.use('/peerjs', ExpressPeerServer(httpServer, { debug: true }))
  // httpServer.on('connection', (id) => {
  //   debug(`Peer connected:`, id)
  //   axios.post('/api/peer', { id })
  // })
  // httpServer.on('disconnect', (id) => {
  //   debug('Peer disconnected')
  // })
  httpServer.listen(config.port, () => {
    debug(`Server running on ${config.port}`)
  })
}
server()
