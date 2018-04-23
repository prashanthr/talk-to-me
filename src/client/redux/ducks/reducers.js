import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import peerReducer from './peer'
import roomReducer from './room'
import userReducer from './user'

export default combineReducers({
  router: routerReducer,
  room: roomReducer,
  user: userReducer,
  peer: peerReducer
})