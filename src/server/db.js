import _debug from 'debug'
var debug = _debug('server:db')
let db = {}

let peerDB = (app) => {
    app.get('/api/peers', (req, res) => {
      res.send(db)
    })

    app.get('/api/peer/:id', (req, res) => {
      let id = req.params.id
      if (db.id){
        res.send(db.id)
      } else {
          res.send(null)
      }
    })

    app.post('/api/peer', (req, res) => {
      debug('POST', req)
      let id = req.body.id
      if (db.id) {
        db[id] = {
          ...db[id],
          ...req.body
        }
      } else {
          db[id] = {
            ...req.body
          }
      }
      res.end()
    })

}

export default peerDB