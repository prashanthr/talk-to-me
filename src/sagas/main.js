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
  CREATE_ROOM_ERROR
} from '../actions/main'
import { call, put, fork, takeLatest } from 'redux-saga/effects'
import axios from 'axios'

function* joinRoom (action) {
  try {
    const response = yield call(() => axios.post('/api/client', {
      name: action.name,
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

function* leaveRoomFlow () {
  yield takeLatest(LEAVE_ROOM, leaveRoom)
}

function* joinRoomFlow () {
  yield takeLatest(JOIN_ROOM, joinRoom)
}

function* createRoomFlow () {
  yield takeLatest(CREATE_ROOM, createRoom)
}

export default [
  fork(leaveRoomFlow),
  fork(joinRoomFlow),
  fork(createRoomFlow)
]
