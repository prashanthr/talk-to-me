import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import peerReducer from './peer'
import roomReducer from './room'
import userReducer from './user'
import soundcheckReducer from './soundcheck'
import sessionReducer from './session'
import chatReducer from './chat'

export default combineReducers({
  router: routerReducer,
  session: sessionReducer,
  room: roomReducer,
  user: userReducer,
  peer: peerReducer,
  chat: chatReducer,
  soundcheck: soundcheckReducer
})
