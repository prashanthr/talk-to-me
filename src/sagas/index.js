
import mainSagas from './main'

function * saga () {
  yield [
    ...mainSagas
  ]
}

export default saga
