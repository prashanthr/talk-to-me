
import { SOCKET_CHAT, SOCKET_CHAT_SEND, SOCKET_INITIALIZE_SUCCESS } from './socket'

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
  hostId: null
}
const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case SOCKET_INITIALIZE_SUCCESS: 
      return {
        ...state,
        hostId: action.socket.id
      }
    case SOCKET_CHAT: 
      console.log('action', action)
      return {
        ...state,
        messages: [
          ...state.messages, { 
            author: action.peerId === state.hostId ? 'me' : 'them',
            type: 'text',
            data: { text: action.message }
          }
        ],
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
