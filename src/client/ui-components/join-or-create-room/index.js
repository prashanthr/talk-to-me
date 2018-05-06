import React, { Component } from 'react'
import { Form, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap'
import { generateName, urlSafe } from '../../utils/room'
import { browserHistory } from 'react-router'

export default class JoinOrCreateRoom extends Component {
  constructor (props) {
    super(props)
    this.onRoomNameChanged = this.onRoomNameChanged.bind(this)
    this.state = {
      roomName: null
    }
  }
  onRoomNameChanged (event) {
    event.preventDefault()
    this.setState({
      roomName: event.target.value
    })
  }
  gotoRoom (roomName) {
    const path = `/room/${roomName}`
    const currentHistoryState = window.history.state
    window.history.pushState(currentHistoryState, `Room - ${path}`, path)
    window.location.replace(path)
  }
  render () {
    return (
      <div>
        <Button
          bsStyle='primary'
          onClick={event => {
            event.preventDefault()
            this.gotoRoom(generateName())
          }}
        >
          Create Room
        </Button>
        <br />
        OR
        <br />
        <Form inline>
          <FormGroup controlId='room-name'>
            <ControlLabel>https://talktome.space/room/</ControlLabel>{' '}
            <FormControl type='text' size={30} placeholder='fluffy-guy' onChange={this.onRoomNameChanged} />
          </FormGroup>{' '}
          <Button
            bsStyle='warning'
            onClick={event => {
              event.preventDefault()
              this.gotoRoom(urlSafe(this.state.roomName))
            }}>
            Join Room
          </Button>
        </Form>
      </div>
    )
  }
}
