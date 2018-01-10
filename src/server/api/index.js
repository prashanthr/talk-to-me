import RoomService from '../services/room'
import ClientService from '../services/client'
import { emitEvent } from '../socket'
import DB from '../db'

const api = (app) => {
  app.get('/api/rooms', (req, res) => {
    return res.send(RoomService.list())
  })

  app.get('/api/rooms/:id', (req, res) => {
    const room = RoomService.get(req.params.id)
    // emitEvent(ioServer, 'Room created', room)
    return res.send(room || RoomService.create(req.params.id, req.params.id))
  })

  app.post('/api/room', (req, res) => {
    console.log('name', req.body.name)
    return res.send(RoomService.create(req.body.name))
  })

  app.delete('/api/rooms/:id', (req, res) => {
    return res.send(RoomService.destroy(req.params.id))
  })

  app.get('/api/clients/:id', (req, res) => {
    return res.send(ClientService.get(req.params.id))
  })

  app.post('/api/client', (req, res) => {
    const clientIp = req.connection ? req.connection.remoteAddress : undefined
    const roomId = req.body.roomId
    const name = req.body.name
    const currentUser = req.body.currentUser
    console.log('client-here')
    const client = currentUser !== null
      ? ClientService.update(currentUser, roomId, clientIp)
      : ClientService.register(name, roomId, clientIp)
    emitEvent('redux-action', client)
    return res.send(client)
  })

  app.get('/api/peers/:roomId/:clientId', (req, res) => {
    const roomId = req.params.roomId
    const clientId = req.params.clientId
    return res.send(ClientService.findPeers(roomId, clientId))
  })

  app.delete('/api/clients/:id', (req, res) => {
    return res.send(ClientService.destroy(req.params.id))
  })

  app.get('/api/db/stat', (req, res) => {
    return res.send(DB.stat())
  })
}

export default api
