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
  PEER_CONNECTED
} from '../actions/session'
import { select, call, put, fork, takeLatest } from 'redux-saga/effects'
import axios from 'axios'

function* findPeers (action) {
  try {
    const response = yield call(() => axios.get(`/api/peers/${action.roomId}/${action.clientId}`))
    if (response.data && response.data.length > 0) {
      yield put({
        type: FIND_PEERS_SUCCESS,
        data: response.data
      })
    }
  } catch (err) {
    console.log(`Error occurred while fetching peers: ${err.message}`)
    yield put({
      type: FIND_PEERS_ERROR,
      error: err
    })
  }
}

function* loadRoom (action) {
  try {
    const response = yield call(() => axios.get(`/api/rooms/${action.id}`))
    yield put({
      type: LOAD_ROOM_SUCCESS,
      data: response.data
    })
  } catch (err) {
    console.log(`Error occurred while loading room: ${err.message}`)
    yield put({
      type: LOAD_ROOM_ERROR,
      error: err
    })
  }
}

function* joinRoom (action) {
  try {
    const user = yield select(
      state => state.session.user
    )
    const response = yield call(() => axios.post('/api/client', {
      name: action.name,
      currentUser: user,
      roomId: action.roomId
    }))
    yield put({
      type: JOIN_ROOM_SUCCESS,
      data: response.data
    })
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

function* findPeersFlow () {
  yield takeLatest(FIND_PEERS, findPeers)
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

export default [
  fork(leaveRoomFlow),
  fork(joinRoomFlow),
  fork(createRoomFlow),
  fork(loadRoomFlow),
  fork(findPeersFlow),
  fork(peerConnectedFlow)
]
