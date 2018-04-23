import { SOCKET_STREAM } from './socket'
import createObjectUrl from '../../utils/create-object-url'
import { VIDEO_MUTE } from './room'
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
          muted: false
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
          streamUrl: createObjectUrl(action.stream)
        }
      }
    case VIDEO_MUTE:
      return {
        ...state,
        [action.peerId]: {
          ...state[action.peerId],
          muted: !state[action.peerId].muted
        }
      }
    default:
      return state
  }
}

export default peerReducer
