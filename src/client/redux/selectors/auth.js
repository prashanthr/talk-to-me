import { createSelector } from 'reselect'
import { isTokenValid } from '../../utils/jwt'
import { getLocalStorage, getUserInfo } from '../../utils/window'
import config from '../../config'
import { captureAll } from '../../third-party/sentry'

const authSelector = state => state.session && state.session.auth

export const getAuth = createSelector(
  authSelector,
  auth => {
    if (auth) return auth
    try {
      return getLocalStorage(config.localStorage.auth)
    } catch (error) {
      const errorMsg = 'Error authenticating'
      console.error(errorMsg, error)
      captureAll({
        message: errorMsg,
        breadcrumb: getUserInfo(),
        error
      })
    }
    return null
  }
)

export const isAuthValid = createSelector(
  state => getAuth(state),
  auth => {
    return (auth && auth.token && isTokenValid(auth.token)) || false
  }
)
