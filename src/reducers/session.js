import { CREATE_ROOM_SUCCESS, JOIN_ROOM_SUCCESS, LEAVE_ROOM_SUCCESS, LOAD_ROOM_SUCCESS, FIND_PEERS_SUCCESS, PEER_CONNECTED, PEER_SIGNAL, PEER_STREAM } from '../actions/session'
import { keys } from 'lodash'

let initialState = {
  roomId: null,
  socketId: null,
  activeRoom: null,
  user: null,
  peers: {}
}

const sessionReducer = (state = initialState, action) => {
  console.log('reducer', action.type, action)
  switch (action.type) {
    case PEER_STREAM:
      return {
        ...state,
        peers: {
          ...state.peers,
          [action.peerId]: {
            ...state.peers[action.peerId],
            peer: action.peer,
            stream: action.stream
          }
        }
      }
    case PEER_SIGNAL:
      return {
        ...state,
        peers: {
          ...state.peers,
          [action.peerId]: {
            ...state.peers[action.peerId],
            signal: action.signal
          }
        }
      }
    case PEER_CONNECTED:
    case LOAD_ROOM_SUCCESS:
    case CREATE_ROOM_SUCCESS:
    case JOIN_ROOM_SUCCESS:
      const peers = {}
      if (action.peers && action.peers.length > 0) {
        action.peers.forEach(peer => {
          peers[peer] = {}
        })
      }
      return {
        ...state,
        roomId: action.roomId,
        socketId: action.socketId,
        peers: peers
      }
    case LEAVE_ROOM_SUCCESS:
    default:
      return state
  }
}

export default sessionReducer
