import { keys } from 'lodash'
import _debug from 'debug'

const debug = _debug('DB')

class DB {
  constructor () {
    this.db = {}
  }

  insert (key, data) {
    if (this.db[key]) {
      throw new Error(`${key} already exists in db`)
    } else {
      this.update(key, data)
    }
  }

  update (key, data) {
    this.db[key] = data
  }

  append (key, data) {
    debug('old', this.db)
    if (this.db[key]) {
      this.db[key].push(data)
    } else {
      this.db[key] = [data]
    }
    debug('new', this.db)
  }

  delete (key) {
    if (this.db[key]) {
      delete this.db[key]
    } else {
      throw new Error(`${key} not found in db`)
    }
  }

  deleteDeep (key, subKey, primaryKey = 'id') {
    if (this.db[key]) {
      const index = this.db[key].findIndex(record => record[primaryKey] === subKey)
      if (index !== -1) {
        delete (this.db[key])[index]
      } else {
        throw new Error(`Can't find ${subKey} in ${key}`)
      }
    } else {
      throw new Error(`${key} not found in db`)
    }
  }

  read (key) {
    if (this.db[key]) {
      return this.db[key]
    } else {
      return null
    }
  }

  readDeep (key, subKey) {
    if (this.db[key]) {
      if ((this.db[key])[subKey]) {
        return (this.db[key])[subKey]
      } else {
        return null
      }
    } else {
      return null
    }
  }

  stat () {
    return {
      keys: keys(this.db).length,
      data: this.db
    }
  }

}

export default new DB()
