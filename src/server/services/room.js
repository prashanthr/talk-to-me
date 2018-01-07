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
  create (name, id) {
    const room = this.get(id)
    if (room) {
      debug('found room, skip create')
      return room
    } else {
      debug('creating room...')
    }
    id = id || cuid()
    DB.append(KEY, {
      id,
      name: name || id,
      numberOfClients: 0
    })
    return this.get(id)
  }
  destroy (id) {
    debug('deleting room...')
    DB.deleteDeep(KEY, id)
  }
  get (id) {
    debug('fetching room...')
    const rooms = this.keyedRooms()
    const room = rooms[id]
    debug('room', room)
    return room
  }
}

export default new RoomService()
