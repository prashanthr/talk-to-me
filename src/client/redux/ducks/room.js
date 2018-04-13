import { JOIN_ROOM_SUCCESS } from './socket'

export const INITIALIZE = 'INITIALIZE'
export const INITIALIZE_SUCCESS = 'INITIALIZE_SUCCESS'
export const INITIALIZE_FAILED = 'INITIALIZE_FAILED'

export const initialize = (roomId) => ({
  type: INITIALIZE,
  roomId
})

let initialState = {
  id: null
}

const roomReducer = (state = initialState, action) => {
  console.log('room-reducer', action.type, action)
  switch (action.type) {
    case INITIALIZE_SUCCESS:
      return {
        ...state,
        id: action.roomId
      }
    case JOIN_ROOM_SUCCESS:
      return {
        ...state,
        initiator: action.initiator
      }
    default:
      return state
  }
}

export default roomReducer
