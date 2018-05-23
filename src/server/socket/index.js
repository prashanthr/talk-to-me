import _debug from 'debug'
import io from '../socket/io'
import { keys } from 'lodash'

const debug = _debug('server:socket')

/* Utils for broadcasting redux-actions */
const buildReduxPayload = (actionType, data) => ({ type: actionType, ...data })
const broadcast = ({
  roomId = null,
  event = 'redux-action',
  payload
}) => {
  if (roomId) {
    io.to(roomId).emit(event, payload)
  } else {
    io.sockets.emit(event, payload)
  }
}

const getRooms = () => io.sockets.adapter.rooms
const getSockets = (roomId) => {
  const rooms = getRooms()
  return rooms[roomId] ? rooms[roomId].sockets : []
}
const getUsers = (roomId) => {
  const sockets = getSockets(roomId)
  debug('sockets', sockets)
  const users = sockets ? keys(sockets) : []
  debug('users', users)
  return users
}

/* Socket setup */
const setup = io => {
  io.on('connection', socket => {
    debug('A user connected, will emit a welcome message')
    socket.emit('connection-accepted', {})
    socket.on('signal', payload => {
      debug('signal: %s, payload: %o', socket.id, payload)
      broadcast({
        roomId: payload.peerId,
        payload: buildReduxPayload('SOCKET_SIGNAL', {
          peerId: socket.id,
          signal: payload.signal
        })
      })
    })

    socket.on('stream', payload => {
      debug('stream: %s, payload: %o', socket.id, payload)
      broadcast({
        roomId: payload.peerId,
        payload: buildReduxPayload('SOCKET_STREAM', {
          peerId: socket.id,
          stream: payload.stream
        })
      })
    })

    socket.on('mute', payload => {
      debug('mute: %s, payload: %o', socket.id, payload)
      broadcast({
        roomId: payload.peerId,
        payload: buildReduxPayload('SOCKET_MUTE', {
          peerId: socket.id,
          muted: payload.muted
        })
      })
    })

    socket.on('nickname', payload => {
      debug('mute: %s, payload: %o', socket.id, payload)
      broadcast({
        roomId: payload.peerId,
        payload: buildReduxPayload('SOCKET_NICKNAME', {
          peerId: socket.id,
          nickname: payload.nickname
        })
      })
    })

    // join room for receiving messages of that room
    socket.on('join', roomId => {
      debug(`received request to join room: ${roomId}. Current rooms: ${socket.rooms}, via adapter ${getRooms()}`)
      socket.leave(roomId)
      socket.join(roomId)
      socket.roomId = roomId
      const peers = getUsers(roomId)
      debug('ready: %s, room: %s, users: %o', socket.id, roomId, peers)
      broadcast({
        roomId,
        payload: buildReduxPayload('JOIN_ROOM_SUCCESS', {
          initiator: socket.id,
          peers
        })
      })
    })

    // leave room for not receiving messages of that room
    socket.on('leave', function (roomId) {
      debug(`received request to leave room: ${roomId}. Current rooms: ${socket.rooms}`)
      socket.leave(roomId)
    })
  })
}

export default setup
