
import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import mainReducer from './main'

export default combineReducers({
  router: routerReducer,
  main: mainReducer
})
