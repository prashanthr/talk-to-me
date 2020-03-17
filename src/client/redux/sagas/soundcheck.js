import { put, fork, takeLatest, call, select } from 'redux-saga/effects'
import { 
  INITIALIZE_SOUNDCHECK,
  INITIALIZE_SOUNDCHECK_SUCCESS,
  INITIALIZE_SOUNDCHECK_FAILED,
  UPDATE_SOUNDCHECK,
  UPDATE_SOUNDCHECK_FAILED,
  UPDATE_SOUNDCHECK_SUCCESS
} from '../ducks/soundcheck'
import { INITIALIZE_SUCCESS } from '../ducks/room'
import { getDevices, getUserMedia } from '../../utils/navigator'
import { setLocalStorage, getLocalStorage, reload } from '../../utils/window'
import config from '../../config'

function* soundcheckInitialize () {
  try {
    const devices = yield getDevices()
    const constraints = getLocalStorage(config.localStorage.gumConstraints)
    let audioEnabled = true
    let videoEnabled = true
    if (constraints) {
      audioEnabled = constraints.audio && constraints.audio !== false
      videoEnabled = constraints.video && constraints.video !== false
    }
    yield put({
      type: INITIALIZE_SOUNDCHECK_SUCCESS,
      devices,
      audioEnabled,
      videoEnabled
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

function* soundcheckUpdate ({ audioInput, audioOutput, videoInput, audioEnabled, videoEnabled }) {
  try {
    const state = yield select(state => state)
    const roomId = state.room.id
    const devices = state.soundcheck.devices
    let propertiesToUpdate = {}
    if (audioInput) {
      propertiesToUpdate = {
        ...propertiesToUpdate,
        defaultAudioInputId: audioInput
      }
    }

    if (videoInput) {
      propertiesToUpdate = {
        ...propertiesToUpdate,
        defaultVideoInputId: videoInput
      }
    }
    yield put({
      type: UPDATE_SOUNDCHECK_SUCCESS,
      data: {
        audioEnabled,
        videoEnabled,
        ...propertiesToUpdate
      }
    })
    const audioOpts = audioEnabled
      ? audioInput /* && devices[audioOutput] */
        ? { deviceId: { exact: devices[audioOutput].deviceId } }
        : true
      : false
    const videoOpts = videoEnabled
      ? videoInput /* && devices[videoInput] */
        ? { deviceId: { exact: devices[videoInput].deviceId } }
        : true
      : false
    const constraints = {
      audio: audioOpts,
      video: videoOpts
    }
    const stream = yield call(getUserMedia, constraints)
    setLocalStorage(config.localStorage.gumConstraints, constraints)
    yield put({
      type: INITIALIZE_SUCCESS,
      roomId,
      stream
    })
    // reload to refresh stream updates
    reload()
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
