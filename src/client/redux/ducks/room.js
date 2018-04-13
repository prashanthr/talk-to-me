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
    default:
      return state
  }
}

export default roomReducer
