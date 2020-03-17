import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, FormGroup, FormControl, Button } from 'react-bootstrap'
import { default as config } from '../../config'
import './index.css'
import Emoji from '../emoji'

export default class JoinOrCreateRoom extends Component {
  constructor (props) {
    super(props)
    this.onInviteCodeChanged = this.onInviteCodeChanged.bind(this)
    this.validate = this.validate.bind(this)
    this.state = {
      inviteCode: null,
      generatedCode: config.inviteCode
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
    return (
      <div className='invite-code-form-wrap'>
        {this.props.error && (
          <div className={this.props.error ? 'error' : ''}>
            {this.props.error || ''}
          </div>
        )}
        <Form inline>
          <FormGroup
            controlId='invite-id'
            onChange={this.onInviteCodeChanged}
          >
            <FormControl
              type='text'
              bsSize='large'
              className={''}
              size={32}
              placeholder='Enter your invite code'
            />
          </FormGroup>{' '}
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
        </Form>
        <br />
        <div className='code-msg'>
          Don't have one?
          <span>
            &nbsp; Use code <span className='generated-invite-code'>{this.state.generatedCode}</span>
          </span>
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
