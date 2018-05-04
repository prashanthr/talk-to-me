import { put, fork, takeLatest, call, select } from 'redux-saga/effects'
import { 
  INITIALIZE_SOUNDCHECK, 
  INITIALIZE_SOUNDCHECK_SUCCESS, 
  INITIALIZE_SOUNDCHECK_FAILED,
  UPDATE_SOUNDCHECK,
  UPDATE_SOUNDCHECK_SUCCESS,
  UPDATE_SOUNDCHECK_FAILED
} from '../ducks/soundcheck'
import { INITIALIZE_SUCCESS } from '../ducks/room'
import { getDevices, getUserMedia } from '../../utils/navigator'

function* soundcheckInitialize () {
  try {
    const devices = yield getDevices()
    yield put({
      type: INITIALIZE_SOUNDCHECK_SUCCESS,
      devices
    })
  } catch (err) {
    console.log('Error initializing soundcheck')
    console.error(err)
    yield put({
      type: INITIALIZE_SOUNDCHECK_FAILED,
      error: err
    })
  }
}

function* soundcheckUpdate ({ audioInput, audioOutput, videoInput }) {
  try {
    const state = yield select(state => state)
    const roomId = state.room.id
    const devices = state.soundcheck.devices
    const constraints = {
      audio: audioOutput /* devices[audioOutput] */ ? { deviceId: { exact: devices[audioOutput].deviceId } } : true,
      video: videoInput /* && devices[videoInput] */ ? { dviceId: { exact: devices[videoInput].deviceId } } : true
    }
    console.log('scheck-updatesaga: constraints', constraints)
    const stream = yield call(getUserMedia, constraints)
    console.log('scheck-updatasaga: stream', stream, roomId, stream.getVideoTracks())
    yield put({
      type: INITIALIZE_SUCCESS,
      roomId,
      stream
    })
  } catch (err) {
    console.log('Error initializing soundcheck')
    console.error(err)
    yield put({
      type: UPDATE_SOUNDCHECK_FAILED,
      error: err
    })
  }
}

function* soundcheckInitializeFlow () {
  yield takeLatest(INITIALIZE_SOUNDCHECK, soundcheckInitialize)
}

function* soundcheckUpdateFlow () {
  yield takeLatest(UPDATE_SOUNDCHECK, soundcheckUpdate)
}

export default [
  fork(soundcheckInitializeFlow),
  fork(soundcheckUpdateFlow)
]
