import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'

class Chat extends Component {
  constructor (props) {
    super(props)
    this.state = {
      message: null
    }
    this.onSendChat = this.onSendChat.bind(this)
    this.onChatMessageChange = this.onChatMessageChange.bind(this)
  }
  onSendChat () {
    this.props.onSendChat(this.state.message)
  }
  onChatMessageChange (event) {
    event.preventDefault()
    if (event.target && event.target.value) {
      this.setState({
        message: event.target.value
      })
    }
  }
  render () {
    return (
      <div>
        {this.props.messages.map((message, index) => (
          <span key={index}>
            {message}
          </span>
        ))}
        <input type='text' onChange={this.onChatMessageChange} />
        <Button
            type='submit'
            bsStyle='warning'
            bsSize='small'
            onClick={event => {
              event.preventDefault()
              this.onSendChat()
            }}>
            Go
          </Button>
      </div>
    )
  }
}

Chat.propTypes = {
  messages: PropTypes.array,
  onSendChat: PropTypes.func
}

export default Chat
