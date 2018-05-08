export const AUTHENTICATE = 'AUTHENTICATE'
export const AUTHENTICATE_SUCCESS = 'AUTHENTICATE_SUCCESS'
export const AUTHENTICATE_FAILED = 'AUTHENTICATE_FAILED'

export const authenticate = (inviteCode) => ({
  type: AUTHENTICATE,
  inviteCode
})
const initialState = {
  auth: null,
  invite: {
    code: null,
    error: null
  }
}

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE_SUCCESS:
      return {
        ...state,
        auth: action.auth,
        invite: {
          code: action.code,
          error: null
        }
      }
    case AUTHENTICATE_FAILED:
      return {
        ...state,
        auth: null,
        invite: {
          code: action.code,
          error: action.error
        }
      }
    default:
      return state
  }
}

export default sessionReducer
