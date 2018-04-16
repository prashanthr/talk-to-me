import { call, put, fork, takeLatest } from 'redux-saga/effects'
import { INITIALIZE, INITIALIZE_SUCCESS, INITIALIZE_FAILED } from '../ducks/room'
import getUserMedia from '../../utils/get-user-media'
import { SOCKET_INITIALIZE } from '../ducks/socket'

function* initialize (action) {
  try {
    const stream = yield call(getUserMedia)
    yield put({
      type: INITIALIZE_SUCCESS,
      roomId: action.roomId,
      stream
    })
    console.log('Stream', stream)
    yield put({
      type: SOCKET_INITIALIZE,
      roomId: action.roomId
    })
  } catch (error) {
    console.error('Initialize Failed', error)
    yield put({
      type: INITIALIZE_FAILED,
      error
    })
  }
}

function* initializeFlow () {
  yield takeLatest(INITIALIZE, initialize)
}

export default [
  fork(initializeFlow)
]
