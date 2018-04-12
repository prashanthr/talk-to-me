import Io from 'socket.io-client'

let socket = new Io()

export default store => {
  socket.on('redux-action', data => {
    store.dispatch(data)
  })

  return next => action => {
    return next(action)
  }
}

export { socket }
