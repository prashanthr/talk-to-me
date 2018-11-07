import React, { Component, Fragment } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { Button, Form, FormGroup, FormControl } from 'react-bootstrap'

class Chat extends Component {
  constructor (props) {
    super(props)
    this.state = {
      message: null
    }
    this.chatForm = null
    this.onSendChat = this.onSendChat.bind(this)
    this.onChatMessageChange = this.onChatMessageChange.bind(this)
    this.clearInput = this.clearInput.bind(this)
  }
  clearInput (ref) {
    const el = ReactDOM.findDOMNode(ref)
    if (el) {
      el.value = ''
    }
  }
  onSendChat (event) {
    event.preventDefault()
    this.clearInput(this.chatForm)
    this.props.onSendChat(this.state.message)
    this.setState({
      message: null
    })
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
          <Fragment key={index}>
            <span>
              {message}
            </span>
            <br />
          </Fragment>
        ))}
        <Form
          inline
          onSubmit={this.onSendChat}
        >
          <FormGroup controlId='chat'>
            <FormControl ref={el => { this.chatForm = el }} type='text' size={30} placeholder={'Message...'} onChange={this.onChatMessageChange} />
          </FormGroup>{' '}
          <Button
            bsStyle='warning'
            onClick={this.onSendChat}
          >
            Send 💬
          </Button>
        </Form>
      </div>
    )
  }
}

Chat.propTypes = {
  messages: PropTypes.array,
  onSendChat: PropTypes.func
}

export default Chat
