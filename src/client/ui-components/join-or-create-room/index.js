import React, { Component } from 'react'
import { Form, FormGroup, FormControl, Button } from 'react-bootstrap'
import { generateName, urlSafe } from '../../utils/room'
import { goToUrl } from '../../utils/window'
import './index.css'

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
    const title = `Room - ${roomName}`
    goToUrl(path, title)
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
          Create New Room
        </Button>
        <br /><br />
        - OR -
        <br /><br />
        <Form inline>
          <FormGroup controlId='room-name'>
            <FormControl type='text' size={30} placeholder={generateName(false)} onChange={this.onRoomNameChanged} />
          </FormGroup>{' '}
          <Button
            bsStyle='warning'
            onClick={event => {
              event.preventDefault()
              if (this.state.roomName) {
                this.gotoRoom(urlSafe(this.state.roomName))
              }
            }}>
            Join Room
          </Button>
        </Form>
      </div>
    )
  }
}
