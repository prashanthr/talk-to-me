import { SOCKET_STREAM, SOCKET_MUTE } from './socket'
export const PEER_ADD = 'PEER_ADD'
export const PEER_REMOVE = 'PEER_REMOVE'

let initialState = {
  /*
    'peer-x': {
      socketId: null,
      channel: null,
      muted: false
    }
  */
}

const peerReducer = (state = initialState, action) => {
  switch (action.type) {
    case PEER_ADD:
      return {
        ...state,
        [action.peerId]: {
          channel: action.channel,
          socketId: action.peerId,
          muted: false,
          disableMute: true
        }
      }
    case PEER_REMOVE:
      const newState = {
        ...state
      }
      delete newState[action.peerId]
      return {
        ...newState
      }
    case SOCKET_STREAM:
      return {
        ...state,
        [action.peerId]: {
          ...state[action.peerId],
          stream: action.stream,
          // streamUrl: createObjectUrl(action.stream)
        }
      }
    case SOCKET_MUTE:
      if (state[action.peerId]) {
        return {
          ...state,
          [action.peerId]: {
            ...state[action.peerId],
            muted: action.muted
          }
        }
      } else {
        return state
      }
    default:
      return state
  }
}

export default peerReducer
