
import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import sessionReducer from './session'

export default combineReducers({
  router: routerReducer,
  session: sessionReducer
})
