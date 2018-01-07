import _debug from 'debug'
const debug = _debug('server:socket')

export const emitEvent = (io, event, data) => {
  io.sockets.emit(event, data)
}

const setup = io => {
  io.on('connection', function (socket) {
    debug('A user connected, will emit a welcome message')
    // @todo add credentials verification
    socket.emit('connection-accepted', {})
    // Handle server-side deletion

    // join room for receiving messages of that room
    socket.on('join', function (room) {
      debug(`received request to join room: ${room}. Current rooms: ${socket.rooms}`)
      socket.join(room)
    })

    // leave room for not receiving messages of that room
    socket.on('leave', function (room) {
      debug(`received request to leave room: ${room}. Current rooms: ${socket.rooms}`)
      socket.leave(room)
    })
  })
}

export default setup
