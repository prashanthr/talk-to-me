import { CREATE_ROOM_SUCCESS, JOIN_ROOM_SUCCESS, LEAVE_ROOM_SUCCESS, LOAD_ROOM_SUCCESS, FIND_PEERS_SUCCESS, PEER_CONNECTED } from '../actions/session'
import { keys } from 'lodash'

let initialState = {
  activeRoom: null,
  user: null,
  peers: {}
}

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case PEER_CONNECTED:
      console.log('peer-connected-reducer', action)
      const shouldInsert = action.data.id !== state.user.id &&
        keys(state.peers).filter(key => key === action.data.id).length === 0
      console.log('should insert', shouldInsert)
      let peerToInsert = {}
      if (shouldInsert) {
        peerToInsert = {
          [action.data.id]: action.data
        }
      } else {
        peerToInsert = {}
      }
      return {
        ...state,
        peers: {
          ...state.peers,
          ...peerToInsert
        }
      }
    // case FIND_PEERS_SUCCESS:
    //   return {
    //     ...state,
    //     peers: action.data ? state.peers.push(action.data) : state.peers
    //   }
    case LOAD_ROOM_SUCCESS:
      return {
        ...state,
        activeRoom: action.data
      }
    case CREATE_ROOM_SUCCESS:
      return {
        ...state,
        activeRoom: action.data
      }
    case JOIN_ROOM_SUCCESS:
      return {
        ...state,
        user: action.data
      }
    case LEAVE_ROOM_SUCCESS:
      return {
        ...state,
        activeRoom: null
      }
    default:
      return state
  }
}

export default sessionReducer
