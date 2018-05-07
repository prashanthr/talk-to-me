import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, FormGroup, FormControl, Button } from 'react-bootstrap'
import './index.css'

export default class JoinOrCreateRoom extends Component {
  constructor (props) {
    super(props)
    this.onInviteCodeChanged = this.onInviteCodeChanged.bind(this)
    this.validate = this.validate.bind(this)
    this.state = {
      inviteCode: null
    }
  }
  validate () {
    if (this.props.error) return 'warning'
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
      <div>
        <Form inline>
          <FormGroup
            controlId='invite-id'
            onChange={this.onInviteCodeChanged}
            validationState={this.validate}
          >
            <FormControl
              type='text'
              bsSize='large'
              size={25}
              placeholder='Enter your invite code'
            />
            <FormControl.Feedback />
            <span className='error'>{' '}{this.props.error}</span>
          </FormGroup>{' '}
          <Button
            bsStyle='warning'
            bsSize='large'
            onClick={event => {
              console.log('here', this.state.inviteCode)
              event.preventDefault()
              if (this.state.inviteCode) {
                this.props.onAuthenticate(this.state.inviteCode)
              }
            }}>
            Go
          </Button>
        </Form>
        <div>
          Don't have one? <a href='#'>Request an invite</a>
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
