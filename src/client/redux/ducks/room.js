import { JOIN_ROOM_SUCCESS } from './socket'

export const INITIALIZE = 'INITIALIZE'
export const INITIALIZE_SUCCESS = 'INITIALIZE_SUCCESS'
export const INITIALIZE_FAILED = 'INITIALIZE_FAILED'
export const SHUTDOWN = 'SHUTDOWN'

export const initialize = (roomId) => ({
  type: INITIALIZE,
  roomId
})

export const shutdown = (roomId) => ({
  type: SHUTDOWN,
  roomId
})

let initialState = {
  id: null,
  error: null
}

const roomReducer = (state = initialState, action) => {
  switch (action.type) {
    case INITIALIZE_SUCCESS:
      return {
        ...state,
        id: action.roomId
      }
    case INITIALIZE_FAILED:
      return {
        ...state,
        error: action.error
      }
    case JOIN_ROOM_SUCCESS:
      return {
        ...state,
        initiator: action.initiator
      }
    case SHUTDOWN:
      return initialState
    default:
      return state
  }
}

export default roomReducer
