import { put, select, fork, takeLatest, takeEvery } from 'redux-saga/effects'
import { socket as clientSocket } from '../../socket'
import {
  SOCKET_INITIALIZE,
  SOCKET_INITIALIZE_SUCCESS,
  SOCKET_INITIALIZE_FAILED,
  SOCKET_SIGNAL,
  JOIN_ROOM_SUCCESS,
  SOCKET_DESTROY
} from '../ducks/socket'

const handleSocketSignal = async ({ peer, peerId, signal }) => {
  return new Promise((resolve, reject) => {
    if (!peer) {
      return reject(`Peer unknown ${peerId} ${peer}`)
    }
    peer.signal(signal)
    return resolve()
  })
}

const handleSocketUsers = async ({ initiator, peers }) => {
  // already done in peer sagas
}
const setup = async (socket, roomId) => {
  return new Promise((resolve, reject) => {
    // connection is already done in socket/index.js but just in case
    socket.once('connect', () => {
      console.info('<>Reconnecting to server once<>')
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
  } catch (error) {
    console.error('Socket Initialize Failed', error)
    yield put({
      type: SOCKET_INITIALIZE_FAILED,
      error
    })
  }
}

function* socketDestroy (action) {
  const destroy = (socket, roomId) => socket.emit('leave', roomId)
  yield destroy(clientSocket, action.roomId)
}

function* socketSignal (action) {
  try {
    const peers = yield select(state => state.peer)
    const peer = peers[action.peerId].channel
    yield handleSocketSignal({ peer, peerId: action.peerId, signal: action.signal })
  } catch (err) {
    console.error(err)
  }
}

function* socketUsers (action) {
  yield handleSocketUsers({ initiator: action.initiator, peers: action.peers })
}
function* socketInitializeFlow () {
  yield takeLatest(SOCKET_INITIALIZE, socketInitialize)
}

function* socketSignalFlow () {
  yield takeEvery(SOCKET_SIGNAL, socketSignal)
}

function* socketUsersFlow () {
  yield takeEvery(JOIN_ROOM_SUCCESS, socketUsers)
}

function* socketDestroyFlow () {
  yield takeLatest(SOCKET_DESTROY, socketDestroy)
}

export default [
  fork(socketInitializeFlow),
  fork(socketSignalFlow),
  fork(socketUsersFlow),
  fork(socketDestroyFlow)
]
