import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, FormGroup, FormControl, Button } from 'react-bootstrap'

export default class JoinOrCreateRoom extends Component {
  constructor (props) {
    super(props)
    this.onInviteCodeChanged = this.onInviteCodeChanged.bind(this)
    this.state = {
      inviteCode: null
    }
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
        <br />
        <Form inline>
          <FormGroup controlId='room-name'
            onChange={this.onInviteCodeChanged}
          >
            <FormControl type='text' size={25} placeholder='Enter your invite code' />
          </FormGroup>{' '}
          <Button
            bsStyle='warning'
            onClick={event => {
              console.log('here', this.state.inviteCode)
              event.preventDefault()
              if (this.state.inviteCode) {
                this.props.onAuthenticate(this.state.inviteCode)
              }
            }}>
            Go
          </Button>
          {' OR '}
          <Button
            href={'#'}
          >
            Request an invite
          </Button>
        </Form>
      </div>
    )
  }
}

JoinOrCreateRoom.propTypes = {
  onAuthenticate: PropTypes.func
}
