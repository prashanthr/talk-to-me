import React, { Component } from 'react'
import { onSendChat, onToggleChat } from '../../redux/ducks/chat'
import SidebarMenu from '../../ui-components/sidebar-menu'
import Chat from '../../ui-components/chat'
import { connect } from 'react-redux'

class ChatMenu extends Component {
  render () {
    return (
      <SidebarMenu
        isOpen={this.props.showChat}
        width={'30%'}
        noOverlay
        disableOverlayClick
        right
        pageWrapId='room-inner-wrapper'
        outerContainerId='room-outer-wrapper'
        customBurgerIcon={false}
        onStateChange={state =>  { if (state.isOpen !== this.props.showChat) { this.props.onToggleChat() } }}
      >
        <Chat
          messages={this.props.chatMessages} 
          onSendChat={this.props.onSendChat}
        />
      </SidebarMenu>
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