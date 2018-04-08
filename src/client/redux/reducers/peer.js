// import { PEER_CREATE, PEER_DESTROY, PEER_DESTROY_ALL } from '../actions/peer'

let initialState = {}

const peerReducer = (state = initialState, action) => {
  console.log('reducer', action.type, action)
  switch (action.type) {
    default:
      return state
  }
}

export default peerReducer
