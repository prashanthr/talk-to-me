import cuid from 'cuid'
import { INITIALIZE_SUCCESS } from './room'
import createObjectUrl from '../../utils/create-object-url'
import { SOCKET_INITIALIZE_SUCCESS } from './socket'

let initialState = {
  id: null,
  stream: null,
  streamUrl: null,
  socket: null
}

const roomReducer = (state = initialState, action) => {
  switch (action.type) {
    case INITIALIZE_SUCCESS:
      return {
        ...state,
        id: cuid(),
        stream: action.stream,
        streamUrl: createObjectUrl(action.stream)
      }
    case SOCKET_INITIALIZE_SUCCESS:
      return {
        ...state,
        socket: action.socket
      }
    default:
      return state
  }
}

export default roomReducer
