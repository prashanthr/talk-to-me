import SimplePeer from 'simple-peer'
import RoomService from './room'
import DB from '../db'
import wrtc from 'wrtc'
import cuid from 'cuid'
import { keyBy } from 'lodash'
import _debug from 'debug'

const debug = _debug('service:client')
const KEY = 'clients'

class ClientService {
  register (roomId, name, ip) {
    const id = cuid()
    const room = RoomService.get(roomId)
    if (!room) {
      throw new Error(`Room ${roomId} does not exist`)
    }
    const initiator = room.numberOfClients === 0
    DB.append(KEY, {
      id,
      name,
      ip,
      roomId,
      initiator,
      connection: new SimplePeer({
        initiator,
        wrtc
      })
    })
    DB.updateDeep(KEY, roomId, {
      ...room,
      numberOfClients: room.numberOfClients + 1
    })
    return this.get(id)
  }

  keyedClients () {
    return keyBy(DB.read(KEY), 'id')
  }

  destroy (id) {
    const client = this.get(id)
    const room = RoomService.get(client.roomId)
    DB.deleteDeep(KEY, id)
    DB.updateDeep(KEY, room.id, {
      ...room,
      numberOfClients: room.numberOfClients - 1
    })
  }

  get (id) {
    const client = this.keyedClients()[id] || null
    debug('client', client)
    return client
  }
}

export default new ClientService()
