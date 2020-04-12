import decode from 'jwt-decode'
import { getUserInfo } from './window'

export const getTokenExpirationDate = token => {
  const decoded = decode(token)
  if (!decoded.exp) {
    return null
  }
  const date = new Date(0)
  date.setUTCSeconds(decoded.exp)
  return date
}

export const isTokenValid = token => {
  try {
    const date = getTokenExpirationDate(token)
    if (!date) {
      return false
    }
    return (date.valueOf() > new Date().valueOf() + 0 * 1000)
  } catch (error) {
    const errorMsg = 'Error validating auth token'
    console.error(errorMsg, error)
    captureAll({
      message: errorMsg,
      breadcrumb: getUserInfo(),
      error
    })
    return false
  }
}
