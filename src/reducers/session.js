import { CREATE_ROOM_SUCCESS, JOIN_ROOM_SUCCESS, LEAVE_ROOM_SUCCESS, LOAD_ROOM_SUCCESS, FIND_PEERS_SUCCESS } from '../actions/session'

let initialState = {
  activeRoom: null,
  user: null,
  peers: []
}

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case FIND_PEERS_SUCCESS:
      return {
        ...state,
        peers: action.data ? state.peers.push(action.data) : state.peers
      }
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
