
import { SOCKET_CHAT, SOCKET_CHAT_SEND } from './socket'

export const TOGGLE_CHAT = 'TOGGLE_CHAT' 

export const onToggleChat = () => ({
  type: TOGGLE_CHAT
})

export const onSendChat = (message) => ({
  type: SOCKET_CHAT_SEND,
  message
})

const initialState = {
  loading: false,
  showChat: false,
  messages: [],
  lastMessageId: null,
}
const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case SOCKET_CHAT: 
      return {
        ...state,
        messages: [...state.messages, action.message],
        showChat: true
      }
    case TOGGLE_CHAT:
      return {
        ...state,
        showChat: !state.showChat
      }
    case SOCKET_CHAT_SEND:
    default:
      return state   
  }
}

export default chatReducer
