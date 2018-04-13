import cuid from 'cuid'
import { INITIALIZE_SUCCESS } from './room'
import createObjectUrl from '../../utils/create-object-url'

let initialState = {
  id: null,
  stream: null,
  streamUrl: null
}

const roomReducer = (state = initialState, action) => {
  console.log('user-reducer', action.type, action)
  switch (action.type) {
    case INITIALIZE_SUCCESS:
      return {
        ...state,
        id: cuid(),
        stream: action.stream,
        streamUrl: createObjectUrl(action.stream)
      }
    default:
      return state
  }
}

export default roomReducer
