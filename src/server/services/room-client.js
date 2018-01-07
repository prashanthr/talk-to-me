import ClientService from './client'
import RoomService from './room'
import _debug from 'debug'
import DB from '../db'

const debug = _debug('service:room-client')

const KEY = 'room-client'
class RoomClient {
  findClientRoom (clientId) {
    const client = ClientService.get(clientId)
    if (!client) {
      return null
    }
    const roomId = DB.readDeep(KEY, clientId)
    debug('room of client', roomId)
    return RoomService.get(roomId) ? roomId : null
  }
  
  findClients (roomId) {
    // const 
  }

  addClient (roomId, clientId) {
    const exists = DB.readDeep(KEY, clientId)
    if (exists) {
      debug('Client is in a room already, reassiging...')
    }
    DB[KEY][clientId] = roomId
    DB.deleteDeep()
    DB.updateDeep(KEY, roomId, clientId)
  }

  removeClient (roomId, clientId) {
    DB[key]
  }
}

export default new RoomClient()
