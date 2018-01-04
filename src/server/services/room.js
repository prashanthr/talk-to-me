import DB from '../db'
import cuid from 'cuid'
import { keyBy } from 'lodash'
import _debug from 'debug'

const debug = _debug('service:room')

const KEY = 'rooms'

class RoomService {
  list () {
    return this.keyedRooms()
  }
  keyedRooms () {
    const raw = DB.read(KEY)
    return keyBy(
      raw,
      'id'
    ) || {}
  }
  create (name) {
    const id = cuid()
    DB.append(KEY, {
      id,
      name,
      numberOfClients: 0
    })
    return this.get(id)
  }
  destroy (id) {
    DB.deleteDeep(KEY, id)
  }
  get (id) {
    const rooms = this.keyedRooms()
    const room = rooms[id]
    debug('room', room)
    return room
  }
}

export default new RoomService()
