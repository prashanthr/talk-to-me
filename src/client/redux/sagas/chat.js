import { put, fork, takeLatest, call, select } from 'redux-saga/effects'
import { 
  CHAT_MSG_SENT,
  CHAT_MSG_UPDATE
} from '../ducks/chat'

function* sendChat (action) {
  try {
    const state = 
   
  } catch (error) {
    console.log('Error sending chat')
    console.error(error)
    // yield put({
    //   type: AUTHENTICATE_FAILED,
    //   code: error.response && error.response.data ? error.response.data.code : action.inviteCode,
    //   error: error.response && error.response.data ? error.response.data.message : error.message
    // })
  }
}

function* sendChatFlow () {
  yield takeLatest(CHAT_MSG_SENT, sendChat)
}

export default [
  fork(sendChatFlow)
]
