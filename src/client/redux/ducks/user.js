import cuid from 'cuid'
import { INITIALIZE_SUCCESS } from './room'
import { SOCKET_INITIALIZE_SUCCESS, SOCKET_MUTE } from './socket'
import { getRandomAvatarUrl } from '../../utils/room'

let initialState = {
  id: null, // not used right now
  stream: null,
  streamUrl: null,
  socket: null,
  poster: null
}

const roomReducer = (state = initialState, action) => {
  switch (action.type) {
    case INITIALIZE_SUCCESS:
      return {
        ...state,
        id: cuid(),
        disableMute: false,
        stream: action.stream,
        poster: getRandomAvatarUrl()
        // streamUrl: createObjectUrl(action.stream)
      }
    case SOCKET_INITIALIZE_SUCCESS:
      return {
        ...state,
        socket: action.socket
      }
    case SOCKET_MUTE: {
      if (state.socket && state.socket.id === action.peerId) {
        return {
          ...state,
          muted: action.muted
        }
      } else {
        return state
      }
    }
    default:
      return state
  }
}

export default roomReducer
