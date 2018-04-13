import { call, put, select, fork, takeLatest } from 'redux-saga/effects'
import { socket as clientSocket } from '../../socket'
import { SOCKET_INITIALIZE, SOCKET_INITIALIZE_SUCCESS, SOCKET_INITIALIZE_FAILED } from '../ducks/socket'

const setup = async (socket) => {
  return new Promise((resolve, reject) => {
    console.log('socket', socket)
    socket.on('connect', () => {
      console.info('Connected to socket server')
    })
    socket.on('disconnect', () => {
      console.info('Disconnected from socket server')
    })
    socket.once('connect', () => {
      return resolve(socket)
    })
  })
}

function* socketInitialize (action) {
  try {
    const socket = yield setup(clientSocket)
    yield put({
      type: SOCKET_INITIALIZE_SUCCESS,
      socket
    })
    console.log('socket', socket)
  } catch (error) {
    console.error('Socket Initialize Failed', error)
    yield put({
      type: SOCKET_INITIALIZE_FAILED,
      error
    })
  }
}

function* socketInitializeFlow () {
  yield takeLatest(SOCKET_INITIALIZE, socketInitialize)
}

export default [
  fork(socketInitializeFlow)
]
