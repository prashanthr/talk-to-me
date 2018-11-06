
import { SOCKET_CHAT, SOCKET_CHAT_SEND } from './socket'

export const sendChat = (message) => ({
  type: SOCKET_CHAT_SEND,
  message
})

const initialState = {
  loading: false,
  messages: [],
  lastMessageId: null,
}
const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case SOCKET_CHAT: 
      return {
        ...state,
        messages: [action.message, ...state.messages],
        lastMessageId: action.message.id
      }
    case SOCKET_CHAT_SEND:
    default:
      return state   
  }
}

export default chatReducer
