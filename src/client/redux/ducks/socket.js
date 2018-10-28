export const SOCKET_INITIALIZE = 'SOCKET_INITIALIZE'
export const SOCKET_INITIALIZE_SUCCESS = 'SOCKET_INITIALIZE_SUCCESS'
export const SOCKET_INITIALIZE_FAILED = 'SOCKET_INITIALIZE_FAILED'
export const SOCKET_DESTROY = 'SOCKET_DESTROY'
export const JOIN_ROOM_SUCCESS = 'JOIN_ROOM_SUCCESS'
export const SOCKET_SIGNAL = 'SOCKET_SIGNAL'
export const SOCKET_CHAT = 'SOCKET_CHAT'
export const SOCKET_STREAM = 'SOCKET_STREAM'
export const SOCKET_MUTE = 'SOCKET_MUTE'

const socketReducer = (state = {}, action) => {
  switch (action) {
    default:
      return state
  }
}

export default socketReducer
