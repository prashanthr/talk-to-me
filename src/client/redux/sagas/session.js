import { put, fork, takeLatest, call } from 'redux-saga/effects'
import { 
  AUTHENTICATE,
  AUTHENTICATE_SUCCESS,
  AUTHENTICATE_FAILED
} from '../ducks/session'
import axios from 'axios'
import { goToUrl, setLocalStorage } from '../../utils/window'

function* authenticate (action) {
  try {
    const response = yield call(() => axios.post('/api/authenticate', {
      code: action.inviteCode
    }))
    const auth = response.data.auth
    setLocalStorage('auth', auth)
    yield put({
      type: AUTHENTICATE_SUCCESS,
      code: response.data.code || action.code,
      auth
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
