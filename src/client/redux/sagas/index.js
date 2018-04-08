
import { all } from 'redux-saga/effects'
// import sessionSagas from './session'

function * saga () {
  yield all([
    // ...sessionSagas
  ])
}

export default saga
