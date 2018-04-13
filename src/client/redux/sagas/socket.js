import { call, put, select, fork, takeLatest } from 'redux-saga/effects'
import { socket as clientSocket } from '../../socket'
import {
  SOCKET_INITIALIZE,
  SOCKET_INITIALIZE_SUCCESS,
  SOCKET_INITIALIZE_FAILED
} from '../ducks/socket'

const handleSocketSignal = async (args) => {

}

const handleSocketUsers = async (args) => {

}
const setup = async (socket, roomId) => {
  return new Promise((resolve, reject) => {
    console.log('socket', socket)
    // connection is already done in socket/index.js but just in case
    socket.once('connect', () => {
      console.info('<>Reconnecting to server once<>')
    })
    socket.on('signal', ({ userId, signal }) => {
      console.info('<>Signalevent<>', userId, signal)
      handleSocketSignal()
    })
    socket.on('users', ({ initiator, users }) => {
      console.info('<>usersevent<>', initiator, users)
      handleSocketUsers()
    })
    socket.emit('join', roomId)
    return resolve(socket)
  })
}

function* socketInitialize (action) {
  try {
    const socket = yield setup(clientSocket, action.roomId)
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
