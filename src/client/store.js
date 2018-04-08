
import { applyMiddleware, compose, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { routerMiddleware } from 'react-router-redux'
import { default as socketReduxActionMiddleware } from './socket'
import reducers from './redux/reducers'
import sagas from './redux/sagas'

export default function configureStore (history) {
  const sagaMiddleware = createSagaMiddleware()
  let middleware = applyMiddleware(
    sagaMiddleware,
    routerMiddleware(history),
    socketReduxActionMiddleware
  )

  if (process.env.NODE_ENV !== 'production') {
    const devToolsExtension = window.devToolsExtension
    if (typeof devToolsExtension === 'function') {
      middleware = compose(middleware, devToolsExtension())
    }
  }

  const store = createStore(reducers, middleware)
  sagaMiddleware.run(sagas)
  return store
}
