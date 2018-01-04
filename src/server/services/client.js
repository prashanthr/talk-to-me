import DB from '../db'
import cuid from 'cuid'
import { keyBy } from 'lodash'

const KEY = 'clients'

class ClientService {
  register (roomId, name, ip) {
    const id = cuid()
    DB.append(KEY, {
      id,
      name,
      ip
    })
    return this.keyedClients()[id]
  }

  keyedClients () {
    return keyBy(DB.read(KEY), 'id')
  }

  destroy (id) {
    DB.deleteDeep(KEY, id)
  }

  get (id) {
    return this.keyedClients()[id] || null
  }
}

export default new ClientService()
