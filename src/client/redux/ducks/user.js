import cuid from 'cuid'
import { INITIALIZE_SUCCESS } from './room'
import createObjectUrl from '../../utils/create-object-url'
import { getRandomAvatarUrl, generateNickname } from '../../utils/room'
import { SOCKET_INITIALIZE_SUCCESS, SOCKET_MUTE } from './socket'

export const NICKNAME_CHANGED = 'NICKNAME_CHANGED'
export const onNicknameChanged = ({ nickname }) => ({
  type: NICKNAME_CHANGED,
  nickname
})

let initialState = {
  id: null, // not used right now
  stream: null,
  streamUrl: null,
  socket: null,
  avatarUrl: null
}

const roomReducer = (state = initialState, action) => {
  switch (action.type) {
    case INITIALIZE_SUCCESS:
      return {
        ...state,
        id: cuid(),
        disableMute: false,
        stream: action.stream,
        streamUrl: createObjectUrl(action.stream),
        avatarUrl: getRandomAvatarUrl(),
        nickname: generateNickname()
      }
    case SOCKET_INITIALIZE_SUCCESS:
      return {
        ...state,
        socket: action.socket
      }
    case NICKNAME_CHANGED:
      return {
        ...state,
        nickname: action.nickname
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
