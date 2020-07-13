import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, FormGroup, FormControl, Button } from 'react-bootstrap'
import { default as config } from '../../config'
import { Recaptcha } from 'swan-react'
import Emoji from '../emoji'
import './index.css'

export default class JoinOrCreateRoom extends Component {
  constructor (props) {
    super(props)
    this.onInviteCodeChanged = this.onInviteCodeChanged.bind(this)
    this.validate = this.validate.bind(this)
    this.toggleRecaptcha = this.toggleRecaptcha.bind(this)
    this.verifyRecaptcha = this.verifyRecaptcha.bind(this)
    this.state = {
      showRecaptcha: false,
      inviteCode: config.inviteCode,
      generatedCode: config.inviteCode,
      isRecaptchaVerified: false
    }
  }

  toggleRecaptcha () {
    this.setState({
      showRecaptcha: !this.state.showRecaptcha
    })
  }

  verifyRecaptcha (token) {
    if (token) {
      this.setState({
        isRecaptchaVerified: true
      })
    }
  }

  validate () {
    if (this.props.error) return 'error'
    return 'success'
  }
  onInviteCodeChanged (event) {
    event.preventDefault()
    this.setState({
      inviteCode: event.target.value
    })
  }
  render () {
    console.log('this.state', this.state)
    return (
      <div>
      <div align='center'>
        {!this.state.showRecaptcha && (
          <Button
            bsStyle='warning'
            bsSize='large'
          
            disabled={this.state.showRecaptcha}
            onClick={event => {
              event.preventDefault()
              this.toggleRecaptcha()
            }}>
              Start Chatting
          </Button>
        )}
        {this.state.showRecaptcha && (
          <Recaptcha
            isVerified={this.state.isRecaptchaVerified}
            recaptchaKey={'6LdJErAZAAAAAL9ee3o50pF1ZHbcBgNYI9U3Wo5W'}//config.recaptchaSiteKey
            onInteractionVerify={this.verifyRecaptcha}
            successComponent={(
              <Button
              type='submit'
              bsStyle='warning'
              bsSize='large'
              disabled={!this.state.inviteCode}
              onClick={event => {
                event.preventDefault()
                if (this.state.inviteCode) {
                  this.props.onAuthenticate(this.state.inviteCode)
                }
              }}>
              Go <Emoji emoji={'🚀'} label='rocket' />
              </Button>
            )}
          />
        )}
      </div>
      </div>
    )
  }
}

JoinOrCreateRoom.propTypes = {
  code: PropTypes.string,
  error: PropTypes.string,
  onAuthenticate: PropTypes.func
}
