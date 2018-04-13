import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
// import sessionReducer from './session'
// import peerReducer from '..'
import roomReducer from '../ducks/room'
import userReducer from '../ducks/user'
// import streamReducer from './stream'

export default combineReducers({
  router: routerReducer,
  room: roomReducer,
  user: userReducer
  // session: sessionReducer,
  // stream: streamReducer,
  // peer: peerReducer
})
