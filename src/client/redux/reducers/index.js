import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import peerReducer from '../ducks/peer'
import roomReducer from '../ducks/room'
import userReducer from '../ducks/user'
// import streamReducer from './stream'

export default combineReducers({
  router: routerReducer,
  room: roomReducer,
  user: userReducer,
  peer: peerReducer
  // stream: streamReducer,
})
