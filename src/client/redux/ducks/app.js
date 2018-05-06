export const AUTHENTICATE = 'AUTHENTICATE'
export const AUTHENTICATE_SUCCESS = 'AUTHENTICATE_SUCCESS'
export const AUTHENTICATE_FAILED = 'AUTHENTICATE_FAILED'

export const authenticate = (inviteCode) => ({
  type: AUTHENTICATE,
  inviteCode
})

const appReducer = (state = {}, action) => {
  switch (action) {
    default:
      return state
  }
}

export default appReducer
