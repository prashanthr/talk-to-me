import React, { Component, Fragment } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { Button, Form, FormGroup, FormControl, Glyphicon } from 'react-bootstrap'
import isValidUrl from '../../utils/is-valid-url'
import './index.css'
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
          <div className='chat-message-list'>
            {this.props.messages.map((message, index) => {
              return (
                <Fragment key={index}>
                  <span className='chat-message'>
                    {isValidUrl(message)
                      ? (<a target='_blank' href={message}>{message}</a>)
                      : (message)
                    }
                  </span>
                  <br />
                </Fragment>
              )
            })}
          </div>
          <Form
            className='chat-form'
            inline
            onSubmit={this.onSendChat}
          >
            <FormGroup controlId='chat'>
              <FormControl ref={el => { this.chatForm = el }} type='text' size={30} placeholder={'Message...'} onChange={this.onChatMessageChange} />
            </FormGroup>{' '}
            <Button
              bsStyle='warning'
              disabled={!this.state.message}
              onClick={this.onSendChat}
            >
              Send <Glyphicon glyph='send' />
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
