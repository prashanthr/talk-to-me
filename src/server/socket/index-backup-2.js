import _debug from 'debug'
import io from '../socket/io'
import { map, keys } from 'lodash'

const debug = _debug('server:socket')

export const emitEvent = (event, data) => {
  debug('io', io)
  debug('socket event', data)
  io.sockets.emit(event, {
    type: 'PEER_CONNECTED',
    data
  })
}

/* Util for broadcasting redux-actions */
const broadcast = (roomId, actionType, data) => {
  io.to(roomId).emit('redux-action', {
    type: actionType,
    ...data
  })
}

const getRooms = () => io.sockets.adapter.rooms
const getSockets = (roomId) => {
  const rooms = getRooms()
  return rooms[roomId] ? rooms[roomId].sockets : []
}
const getUsers = (roomId) => {
  // (map(io.sockets.adapter.rooms[roomId].sockets, (_, id) => {
  //   return { id }
  // }))
  const sockets = getSockets(roomId)
  debug('SOCKATS', sockets)
  const users = sockets ? keys(sockets) : []
  debug('USARS', users)
  return users
}

const setup = io => {
  io.on('connection', (socket) => {
    debug('A user connected, will emit a welcome message')
    // @todo add credentials verification
    socket.emit('connection-accepted', {})
    // Handle server-side deletion

    socket.on('signal', payload => {
      debug('signal: %s, payload: %o', socket.id, payload)
      broadcast(payload.roomId, 'PEER_SIGNAL', {
        peerId: socket.id,
        signal: payload.signal
      })
    })

    socket.on('stream', payload => {
      debug('stream: %s, payload: %o', socket.id, payload)
      broadcast(payload.roomId, 'PEER_STREAM', {
        peerId: socket.id,
        peer: payload.peer,
        stream: payload.stream
      })
    })

    // join room for receiving messages of that room
    socket.on('join', (roomId) => {
      debug(`received request to join room: ${roomId}. Current rooms: ${socket.rooms}`)
      socket.leave(roomId)
      socket.join(roomId)
      socket.roomId = roomId
      const users = getUsers(roomId)
      debug('ready: %s, room: %s, users: %o', socket.id, roomId, users)
      broadcast(roomId, 'JOIN_ROOM_SUCCESS', {
        socketId: socket.id,
        peers: users
      })
      // io.to(roomId).emit('users', {
      //   initiator: socket.id,
      //   users
      // })
    })

    // leave room for not receiving messages of that room
    socket.on('leave', function (roomId) {
      debug(`received request to leave room: ${roomId}. Current rooms: ${socket.rooms}`)
      socket.leave(roomId)
    })
  })
}

export default setup
