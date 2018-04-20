import { call, put, fork, takeLatest } from 'redux-saga/effects'
import { INITIALIZE, INITIALIZE_SUCCESS, INITIALIZE_FAILED, SHUTDOWN } from '../ducks/room'
import getUserMedia from '../../utils/get-user-media'
import { SOCKET_INITIALIZE, SOCKET_DESTROY } from '../ducks/socket'

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
    console.log('Initialize Failed')
    console.error(error)
    yield put({
      type: INITIALIZE_FAILED,
      error
    })
  }
}

function* shutdown (action) {
  try {
    yield put({
      type: SOCKET_DESTROY,
      roomId: action.roomId
    })
  } catch (error) {
    console.log('Error destorying socket')
    console.error(error)
  }
}

function* initializeFlow () {
  yield takeLatest(INITIALIZE, initialize)
}

function* shutdownFlow () {
  yield takeLatest(SHUTDOWN, shutdown)
}

export default [
  fork(initializeFlow),
  fork(shutdownFlow)
]
