
export const CHAT_MSG_UPDATE = 'CHAT_MSG_UPDATE'
export const CHAT_MSG_SENT = 'CHAT_MSG_SENT'

const initialState = {
  loading: false,
  messages: [],
  lastMessageId: null,
}
const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHAT_MSG_UPDATE: {
      ...state,
      messages: [action.message, ...state.messages]
      lastMessageId: action.message.id
    }
  }
}
