
import { all } from 'redux-saga/effects'
import roomSagas from './room'

function * saga () {
  yield all([
    ...roomSagas
  ])
}

export default saga
