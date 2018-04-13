export const INITIALIZE = 'INITIALIZE'
export const INITIALIZE_SUCCESS = 'INITIALIZE_SUCCESS'
export const INITIALIZE_FAILED = 'INITIALIZE_FAILED'

export const initialize = () => ({
  type: INITIALIZE
})

let initialState = {
  id: null,
  client: null,
  peers: null,
  user: null
}

const roomReducer = (state = initialState, action) => {
  console.log('reducer', action.type, action)
  switch (action.type) {
    default:
      return state
  }
}

export default roomReducer
