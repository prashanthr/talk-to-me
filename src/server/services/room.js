import DB from '../db'
import cuid from 'cuid'
import { keyBy } from 'lodash'

const KEY = 'rooms'

class RoomService {
  list () {
    return this.keyedRooms()
  }
  keyedRooms () {
    const raw = DB.read(KEY)
    console.log('raw', raw)
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
    console.log(this.get(id))
    return this.get(id)
  }
  destroy (id) {
    DB.deleteDeep(KEY, id)
  }
  get (id) {
    const rooms = this.keyedRooms()
    console.log('rpp,', rooms)
    return rooms[id]
  }
}

export default new RoomService()
