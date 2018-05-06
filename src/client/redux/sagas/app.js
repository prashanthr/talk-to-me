import { put, fork, takeLatest, call, select } from 'redux-saga/effects'
import { 
  AUTHENTICATE,
  AUTHENTICATE_SUCCESS,
  AUTHENTICATE_FAILED
} from '../ducks/app'
import axios from 'axios'
import { goToUrl } from '../../utils/navigator'

function* authenticate (action) {
  try {
    const response = yield call(axios.post('/api/authenticate', {
      code: action.inviteCode
    }))
    yield put({
      type: AUTHENTICATE_SUCCESS,
      ...response.data
    })
    goToUrl('/welcome', 'Welcome')
  } catch (err) {
    console.log('Error authenticating')
    console.error(err)
    yield put({
      type: AUTHENTICATE_FAILED,
      error: err
    })
  }
}

function* authenticateFlow () {
  yield takeLatest(AUTHENTICATE, authenticate)
}

export default [
  fork(authenticateFlow)
]
