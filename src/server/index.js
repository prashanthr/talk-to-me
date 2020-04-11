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
import io from './socket/io'
import cronSchedule from 'node-schedule'
import healthCheck from './utils/health-check'

const debug = _debug('server')

const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json({ limit: '0.5mb' }))
app.use(express.static(path.join(__dirname, '/../../build')))
app.use('/', publicRouter)

// API
api(app)
// Error handler
app.use((err, req, res, next) => {
  debug('Server Error handler', err, err.stack)
})

let server = async () => {
  let httpServer = http.Server(app)
  app.use(function (req, res) {
    res.sendFile(path.join(__dirname, '/../../build', 'index.html'))
  })
  httpServer.listen(config.port, () => {
    debug(`Server running on ${config.port}`)
    const ioServer = io.attach(httpServer)
    socketController(ioServer)
    // cron health check
    const { endpoint, schedule, enabled } = config.healthCheck
    if (enabled) {
      debug(`Health check is enabled for ${schedule}`)
      cronSchedule.scheduleJob(
        schedule,
        async () => { await healthCheck(endpoint) }
      )
    } else {
      debug('Health check is disabled')
    }
  })
}
server()
