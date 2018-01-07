import Io from 'socket.io-client'

let rootSocket

export const joinRoom = (room) => {
  rootSocket.emit('join', room)
}

export const leaveRoom = (room) => {
  rootSocket.emit('leave', room)
}

export default store => {
  rootSocket = new Io()
  rootSocket.on('redux-action', function (data) {
    store.dispatch(data)
  })

  return next => action => {
    return next(action)
  }
}
