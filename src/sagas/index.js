
import sessionSagas from './session'

function * saga () {
  yield [
    ...sessionSagas
  ]
}

export default saga
