import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import createHistory from 'history/createBrowserHistory'
import { ConnectedRouter } from 'react-router-redux'
import configureStore from './store'
import PublicRoute from './route/public'
import App from './views'

const history = createHistory()
export const store = configureStore(history)

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <PublicRoute path='/' component={App} />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)
