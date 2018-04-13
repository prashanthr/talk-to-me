
import { all } from 'redux-saga/effects'
import roomSagas from './room'
import socketSagas from './socket'
import peerSagas from './peer'

function * saga () {
  yield all([
    ...roomSagas,
    ...socketSagas,
    ...peerSagas
  ])
}

export default saga
