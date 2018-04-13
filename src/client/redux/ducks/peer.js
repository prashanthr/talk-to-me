export const PEER_ADD = 'PEER_ADD'

let initialState = {
  'test': {
    socketId: null,
    channel: null
  }
}

const peerReducer = (state = initialState, action) => {
  console.log('ADD_PEER', action)
  switch (action.type) {
    case PEER_ADD:
      return {
        ...state,
        [action.peerId]: {
          channel: action.channel,
          socketId: action.peerId
        }
      }
    default:
      return state
  }
}

export default peerReducer
