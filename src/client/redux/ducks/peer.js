import { SOCKET_STREAM, SOCKET_MUTE, SOCKET_NICKNAME } from './socket'
import createObjectUrl from '../../utils/create-object-url'
import { getRandomAvatarUrl, generateNickname } from '../../utils/room'
export const PEER_ADD = 'PEER_ADD'
export const PEER_REMOVE = 'PEER_REMOVE'

let initialState = {
  /*
    'peer-x': {
      socketId: null,
      channel: null,
      muted: false,
      disableMute: true,
      avatarUrl: null
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
          disableMute: true,
          avatarUrl: getRandomAvatarUrl(),
          nickname: action.nickname || generateNickname(action.peerId)
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
    case SOCKET_NICKNAME:
      if (state[action.peerId]) {
        return {
          ...state,
          [action.peerId]: {
            ...state[action.peerId],
            nickname: action.nickname
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
