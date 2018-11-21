import React, { Component } from 'react'
import { onSendChat, onToggleChat } from '../../redux/ducks/chat'
import Chat from '../../ui-components/chat'
import { connect } from 'react-redux'

class ChatMenu extends Component {
  render () {
    return (
      <Chat
        header={'Chat'}
        onToggleChat={this.props.onToggleChat}
        showChat={this.props.showChat}
        messages={this.props.chatMessages} 
        onSendChat={this.props.onSendChat}
      />
    )
  }
}

function mapStateToProps (state) {
  return {
    showChat: state.chat.showChat,
    chatMessages: state.chat.messages || []
  }
}

export default connect(mapStateToProps, { onSendChat, onToggleChat })(ChatMenu)