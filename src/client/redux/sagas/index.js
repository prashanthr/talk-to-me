
import { all } from 'redux-saga/effects'
import roomSagas from './room'
import socketSagas from './socket'
import peerSagas from './peer'
import soundcheckSagas from './soundcheck'
import sessionSagas from './session'
// import chatSagas from './chat'
function * saga () {
  yield all([
    ...roomSagas,
    ...socketSagas,
    ...peerSagas,
    ...soundcheckSagas,
    ...sessionSagas,
    // ...chatSagas
  ])
}

export default saga
