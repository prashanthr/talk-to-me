import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
// import sessionReducer from './session'
// import peerReducer from '..'
import roomReducer from '../ducks/room'
// import streamReducer from './stream'

export default combineReducers({
  router: routerReducer,
  room: roomReducer
  // session: sessionReducer,
  // stream: streamReducer,
  // peer: peerReducer
})
