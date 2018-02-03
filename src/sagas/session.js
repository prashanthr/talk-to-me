// @flow
import {
  JOIN_ROOM,
  JOIN_ROOM_SUCCESS,
  JOIN_ROOM_ERROR,
  LEAVE_ROOM,
  LEAVE_ROOM_SUCCESS,
  LEAVE_ROOM_ERROR,
  CREATE_ROOM,
  CREATE_ROOM_SUCCESS,
  CREATE_ROOM_ERROR,
  LOAD_ROOM,
  LOAD_ROOM_ERROR,
  LOAD_ROOM_SUCCESS,
  FIND_PEERS,
  FIND_PEERS_ERROR,
  FIND_PEERS_SUCCESS,
  PEER_CONNECTED,
  INIT_STREAM
} from '../actions/session'
import { select, call, put, fork, takeLatest } from 'redux-saga/effects'
import axios from 'axios'
import cuid from 'cuid'
import { joinRoom as socketJoinRoom, leaveRoom as socketLeaveRoom, signal as socketSignal, stream as socketStream} from '../socket'
import { getMediaStream, createPeer } from '../peer/simple-peer'

function* loadRoom (action) {
  try {
    const roomId = action.id
    yield socketJoinRoom(roomId)
    // yield put({
    //   type: LOAD_ROOM_SUCCESS,
    //   roomId
    // })
    // yield joinRoom(action)
    yield put({
      type: INIT_STREAM,
      roomId
    })
  } catch (err) {
    console.log(`Error occurred while loading room: ${err.message}`)
    yield put({
      type: LOAD_ROOM_ERROR,
      error: err
    })
  }
}

function* initStream (action) {
  try {
    const roomId = action.roomId
    console.log('r@', roomId)
    let streamg = yield getMediaStream()
    // yield getMediaStream({ audio: true, video: true }, (stream) => {
    //   streamg = stream
    // })
    // let signalg
    const peer = yield createPeer({ initiator: true }, roomId, streamg)
    console.log('peer@', peer)
    console.log('streamg@', streamg)
    yield socketStream(roomId, peer, streamg)
    // yield socketSignal(roomId, signalg)
  } catch (err) {
    console.log(`Error occurred while init stream: ${err.message}`)
  }
}

function* joinRoom (action) {
  try {
    const user = { id: cuid() }
    const stream = yield getMediaStream()
    yield put({
      type: JOIN_ROOM_SUCCESS,
      data: { user, stream }
    })
    yield socketSignal(user.id, stream)
  } catch (err) {
    console.log(`Error occurred while joining room: ${err.message}`)
    yield put({
      type: JOIN_ROOM_ERROR,
      error: err
    })
  }
}

function* leaveRoom (action) {
  try {
    const response = yield call(() => axios.delete(`/api/rooms/${action.id}`))
    yield put({
      type: LEAVE_ROOM_SUCCESS,
      data: response.data
    })
  } catch (err) {
    console.log(`Error occurred while leaving room: ${err.message}`)
    yield put({
      type: LEAVE_ROOM_ERROR,
      error: err
    })
  }
}

function* createRoom (action) {
  try {
    const response = yield call(() => axios.post('/api/room', {
      name: action.name
    }))
    yield put({
      type: CREATE_ROOM_SUCCESS,
      data: response.data
    })
  } catch (err) {
    console.log(`Error occurred while creating room: ${err.message}`)
    yield put({
      type: CREATE_ROOM_ERROR,
      error: err
    })
  }
}

function* peerConnected (action) {
  try {
    console.log('peer-connected-saga', action)
  } catch (error) {
    console.log('Peer Connected error', error)
  }
}

function* peerConnectedFlow () {
  yield takeLatest(PEER_CONNECTED, peerConnected)
}

function* leaveRoomFlow () {
  yield takeLatest(LEAVE_ROOM, leaveRoom)
}

function* joinRoomFlow () {
  yield takeLatest(JOIN_ROOM, joinRoom)
}

function* createRoomFlow () {
  yield takeLatest(CREATE_ROOM, createRoom)
}

function* loadRoomFlow () {
  yield takeLatest(LOAD_ROOM, loadRoom)
}

function* initStreamFlow () {
  yield takeLatest(INIT_STREAM, initStream)
}

export default [
  fork(leaveRoomFlow),
  fork(joinRoomFlow),
  fork(createRoomFlow),
  fork(loadRoomFlow),
  fork(peerConnectedFlow),
  fork(initStreamFlow)
]
