import Io from 'socket.io-client'

let socket = new Io()

export default store => {
  socket.on('connect', () => {
    console.info('Connected to socket server')
  })
  socket.on('disconnect', () => {
    console.info('Disconnected from socket server')
  })
  socket.on('redux-action', data => {
    store.dispatch(data)
  })

  return next => action => {
    return next(action)
  }
}

export { socket }
