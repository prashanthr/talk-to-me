import React from 'react'
import PropTypes from 'prop-types'
import { Launcher } from 'react-chat-window'

const Chat = ({ header, showChat, messages, onSendChat, onToggleChat }) => (
  <Launcher
    handleClick={onToggleChat}
    isOpen={showChat}
    agentProfile={{
      teamName: header || 'TalktoMe Chat',
      imageUrl: ''
    }}
    onMessageWasSent={message => onSendChat(message.data.text || message.data.emoji)}
    messageList={messages}
    showEmoji
  />
)

Chat.propTypes = {
  header: PropTypes.string,
  showChat: PropTypes.bool,
  messages: PropTypes.array,
  onSendChat: PropTypes.func,
  onToggleChat: PropTypes.func
}

export default Chat
