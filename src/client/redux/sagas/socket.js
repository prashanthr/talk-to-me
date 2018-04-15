import { call, put, select, fork, takeLatest, takeEvery } from 'redux-saga/effects'
import { socket as clientSocket } from '../../socket'
import {
  SOCKET_INITIALIZE,
  SOCKET_INITIALIZE_SUCCESS,
  SOCKET_INITIALIZE_FAILED,
  SOCKET_SIGNAL,
  SOCKET_STREAM,
  JOIN_ROOM_SUCCESS
} from '../ducks/socket'

const handleSocketSignal = async ({ peer, peerId, signal }) => {
  console.info('Received signal', peerId, signal)
  return new Promise((resolve, reject) => {
    if (!peer) {
      return reject(`Peer unknown ${peerId} ${peer}`)
    }
    console.info('sig', signal, 'peer', peer)
    peer.signal(signal)
    return resolve()
  })
}

const handleSocketUsers = async ({ initiator, peers }) => {
  console.info('Received users', initiator, peers)
  // already done in peer sagas
}
const setup = async (socket, roomId) => {
  return new Promise((resolve, reject) => {
    console.log('socket', socket)
    // connection is already done in socket/index.js but just in case
    socket.once('connect', () => {
      console.info('<>Reconnecting to server once<>')
    })
    // socket.on('signal', ({ userId, signal }) => {
    //   console.log('Is this even working?')
    //   console.info('<>Signalevent<>', userId, signal)
    //   handleSocketSignal()
    // })
    // socket.on('users', ({ initiator, users }) => {
    //   console.log('Is this even working?')
    //   console.info('<>usersevent<>', initiator, users)
    //   handleSocketUsers()
    // })
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

function* socketSignal (action) {
  console.log('socketSignalFlow', action)
  try {
    const peers = yield select(state => state.peer)
    const peer = peers[action.peerId].channel
    yield handleSocketSignal({ peer, peerId: action.peerId, signal: action.signal })
  } catch (err) {
    console.error(err)
  }
}

function* socketUsers (action) {
  console.log('socketUsersflow', action)
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

export default [
  fork(socketInitializeFlow),
  fork(socketSignalFlow),
  fork(socketUsersFlow)
]
