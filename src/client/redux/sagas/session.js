import { put, fork, takeLatest, call, select } from 'redux-saga/effects'
import { 
  AUTHENTICATE,
  AUTHENTICATE_SUCCESS,
  AUTHENTICATE_FAILED
} from '../ducks/session'
import axios from 'axios'
import { goToUrl } from '../../utils/navigator'

function* authenticate (action) {
  try {
    const response = yield call(() => axios.post('/api/authenticate', {
      code: action.inviteCode
    }))
    yield put({
      type: AUTHENTICATE_SUCCESS,
      code: response.data.code,
      auth: response.data.auth
    })
    goToUrl('/welcome', 'Welcome')
  } catch (error) {
    console.log('Error authenticating')
    console.error(error)
    yield put({
      type: AUTHENTICATE_FAILED,
      code: error.response && error.response.data ? error.response.data.code : action.inviteCode,
      error: error.response && error.response.data ? error.response.data.message : error.message
    })
  }
}

function* authenticateFlow () {
  yield takeLatest(AUTHENTICATE, authenticate)
}

export default [
  fork(authenticateFlow)
]
