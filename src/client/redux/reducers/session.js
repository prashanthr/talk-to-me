// import { SETUP } from '../actions/session'

let initialState = {
  roomId: null,
  socketId: null,
  activeRoom: null,
  user: null
}

const sessionReducer = (state = initialState, action) => {
  console.log('reducer', action.type, action)
  switch (action.type) {
    default:
      return state
  }
}

export default sessionReducer
