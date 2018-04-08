// import { SOCKET_JOIN, SOCKET_LEAVE, SOCKET_SIGNAL, SOCKET_STREAM } from '../actions/socket'

let initialState = {}

const socketReducer = (state = initialState, action) => {
  console.log('reducer', action.type, action)
  switch (action.type) {
    default:
      return state
  }
}

export default socketReducer
