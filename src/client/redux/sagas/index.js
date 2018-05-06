
import { all } from 'redux-saga/effects'
import roomSagas from './room'
import socketSagas from './socket'
import peerSagas from './peer'
import soundcheckSagas from './soundcheck'
import appSagas from './app'

function * saga () {
  yield all([
    ...roomSagas,
    ...socketSagas,
    ...peerSagas,
    ...soundcheckSagas,
    ...appSagas
  ])
}

export default saga
