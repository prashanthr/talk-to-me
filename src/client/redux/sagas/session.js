import { put, fork, takeLatest, call } from 'redux-saga/effects'
import { 
  AUTHENTICATE,
  AUTHENTICATE_SUCCESS,
  AUTHENTICATE_FAILED
} from '../ducks/session'
import axios from 'axios'
import config from '../../config'
import { goToUrl, setLocalStorage, getNextUrl, getUserInfo } from '../../utils/window'
import { captureAll } from '../../third-party/sentry'

function* authenticate (action) {
  try {
    const response = yield call(() => axios.post('/api/authenticate', {
      code: action.inviteCode
    }))
    const auth = response.data.auth
    const code = response.data.code || action.code
    setLocalStorage(config.localStorage.auth, auth)
    setLocalStorage(config.localStorage.code, code)
    yield put({
      type: AUTHENTICATE_SUCCESS,
      code,
      auth
    })
    const next = getNextUrl()
    const nextUrl = `/welcome${next || ''}`
    goToUrl(nextUrl, 'Welcome')
  } catch (error) {
    const errorMsg = 'Error authenticating'
    console.log(errorMsg)
    console.error(error)
    captureAll({
      message: errorMsg,
      breadcrumb: getUserInfo(),
      error
    })
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
