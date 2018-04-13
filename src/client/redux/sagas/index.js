
import { all } from 'redux-saga/effects'
import roomSagas from './room'
import socketSagas from './socket'

function * saga () {
  yield all([
    ...roomSagas,
    ...socketSagas
  ])
}

export default saga
