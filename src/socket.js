import Io from 'socket.io-client'

let rootSocket

export const joinRoom = (roomId) => {
  console.log('socket-client', 'join-room')
  rootSocket.emit('join', roomId)
}

export const leaveRoom = (roomId) => {
  console.log('socket-client', 'leave-room')
  rootSocket.emit('leave', roomId)
}

export const signal = (roomId, signal) => {
  console.log('socket-client', 'signal')
  rootSocket.emit('signal', { roomId, signal })
}
export const stream = (roomId, peer, stream) => {
  console.log('socket-client', 'stream', roomId, peer, stream)
  rootSocket.emit('stream', { roomId, peer, stream })
}

export default store => {
  rootSocket = new Io()
  rootSocket.on('redux-action', (data) => {
    store.dispatch(data)
  })

  return next => action => {
    return next(action)
  }
}
