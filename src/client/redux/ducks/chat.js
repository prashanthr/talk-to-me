
import { SOCKET_CHAT, SOCKET_CHAT_SEND } from './socket'

export const onSendChat = (message) => ({
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
        messages: [...state.messages, action.message],
      }
    case SOCKET_CHAT_SEND:
    default:
      return state   
  }
}

export default chatReducer
