import { call, put, fork, takeLatest } from 'redux-saga/effects'
import { INITIALIZE, INITIALIZE_SUCCESS, INITIALIZE_FAILED, SHUTDOWN } from '../ducks/room'
import { SOCKET_INITIALIZE, SOCKET_DESTROY } from '../ducks/socket'
import { getUserMedia } from '../../utils/navigator'
import { getLocalStorage, getUserInfo } from '../../utils/window'
import config from '../../config'
import { captureAll } from '../../third-party/sentry'

function* initialize (action) {
  try {
    const constraints = getLocalStorage(config.localStorage.gumConstraints)
    let stream
    if (constraints) {
      stream = yield call(getUserMedia, constraints)
    } else {
      stream = yield call(getUserMedia)
    }
    yield put({
      type: INITIALIZE_SUCCESS,
      roomId: action.roomId,
      stream
    })
    yield put({
      type: SOCKET_INITIALIZE,
      roomId: action.roomId
    })
  } catch (error) {
    const errorMsg = 'Initialize Failed'
    console.log(errorMsg)
    console.error(error)
    captureAll({
      message: errorMsg,
      breadcrumb: getUserInfo(),
      error
    })
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
    const errorMsg = 'Error destorying socket'
    console.log(errorMsg)
    console.error(error)
    captureAll({
      message: errorMsg,
      breadcrumb: getUserInfo(),
      error
    })
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
