import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import sessionReducer from './session'
import peerReducer from './peer'
// import streamReducer from './stream'

export default combineReducers({
  router: routerReducer,
  session: sessionReducer,
  // stream: streamReducer,
  peer: peerReducer
})
