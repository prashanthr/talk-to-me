import RoomService from '../services/room'
import ClientService from '../services/client'

const api = (app) => {
  app.get('/api/rooms', (req, res) => {
    return res.send(RoomService.list())
  })

  app.get('/api/rooms/:id', (req, res) => {
    return res.send(RoomService.get(req.params.id))
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
    return res.send(ClientService.register(roomId, clientIp))
  })

  app.delete('/api/clients/:id', (req, res) => {
    return res.send(ClientService.destroy(req.params.id))
  })
}

export default api
