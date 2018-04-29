import { put, fork, takeLatest } from 'redux-saga/effects'
import { INITIALIZE_SOUNDCHECK, INITIALIZE_SOUNDCHECK_SUCCESS, INITIALIZE_SOUNDCHECK_FAILED } from '../ducks/soundcheck'
import { getDevices } from '../../utils/navigator'

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

function* soundcheckInitializeFlow () {
  yield takeLatest(INITIALIZE_SOUNDCHECK, soundcheckInitialize)
}

export default [
  fork(soundcheckInitializeFlow)
]
