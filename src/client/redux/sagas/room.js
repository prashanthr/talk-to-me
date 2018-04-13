import { call, put, select, fork } from 'redux-saga/effects'
import axios from 'axios'
import { takeLatest } from 'redux-saga'
import { INITIALIZE, INITIALIZE_SUCCESS, INITIALIZE_FAILED } from '../ducks/room'
import getUserMedia from '../../utils/get-user-media'

function* initialize (action) {
  const stream = yield call(getUserMedia)
  console.log('Stream', stream)
}

function* initializeFlow () {
  yield takeLatest(INITIALIZE, initialize)
}

export default [
  fork(initializeFlow)
]
