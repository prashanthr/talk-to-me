import decode from 'jwt-decode'

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
    console.error(error)
    return false
  }
}
