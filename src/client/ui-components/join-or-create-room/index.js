import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Form, FormGroup, FormControl, Button } from 'react-bootstrap'
import DropdownMenu from '../dropdown-menu'
import Emoji from '../emoji'
import { generateName, urlSafe } from '../../utils/room'
import { goToUrl, setLocalStorage } from '../../utils/window'
import config from '../../config'
import './index.css'

const emojiGenie = <Emoji emoji={'🧞'} label='genie' />
const emojiLightBulb = <Emoji emoji={'💡'} label='genie' />

export default class JoinOrCreateRoom extends Component {
  constructor (props) {
    super(props)
    this.onRoomNameChanged = this.onRoomNameChanged.bind(this)
    this.onCustomizeRoom = this.onCustomizeRoom.bind(this)
    this.onMediaSourceChanged = this.onMediaSourceChanged.bind(this)
    this.state = {
      showCustomRoomOptions: false,
      roomNamePlaceholder: generateName(false),
      roomName: null,
      constraints: { audio: true, video: true }
    }
  }
  onMediaSourceChanged (event) {
    event.preventDefault()
    const constraintsMap = {
      'av': { audio: true, video: true },
      'a': { audio: true, video: false },
      'v': { audio: false, video: false }
    }
    const constraints = constraintsMap[event.target.value]
    if (constraints) {
      setLocalStorage(config.localStorage.gumConstraints, constraints)
      this.setState({
        constraints
      })
    }
  }
  onCustomizeRoom (event) {
    event.preventDefault()
    this.setState({
      showCustomRoomOptions: !this.state.showCustomRoomOptions
    })
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
    const mediaSourceOptions = [{
      key: 'av',
      label: `Default (Audio 🎙 + Video 📹)`
    }, {
      key: 'a',
      label: `Audio only 🎙️`
    }, {
      key: 'v',
      label: `Video only 📹`
    }]
    return (
      <div>
        <Row>
          <Col md={12}>
            <label>Settings</label>
            <Row>
              <Col md={6}>
                Device Options
              </Col>
              <Col md={6}>
                <DropdownMenu
                  items={mediaSourceOptions}
                  selectedKey={mediaSourceOptions[0].key}
                  onChange={this.onMediaSourceChanged}
                />
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <label>Ready?</label>
            {this.props.roomId
              ? (
                <div>
                  Join Room
                  &nbsp;
                  <Button
                    bsSize='small'
                    bsStyle={'primary'}
                    onClick={event => {
                      event.preventDefault()
                      this.gotoRoom(this.props.roomId)
                    }}
                  >
                    {`${this.props.roomId}`}
                  </Button>
                </div>
                )
              : (
                <div>
                  <Button
                    bsStyle='primary'
                    onClick={event => {
                      event.preventDefault()
                      this.gotoRoom(generateName())
                    }}
                  >
                    Create New Room {emojiLightBulb}
                  </Button>
                  &nbsp;&nbsp; OR &nbsp;&nbsp;
                  <Button bsSize='small' onClick={this.onCustomizeRoom}>
                    Customize Room {emojiGenie}
                  </Button>
                  {this.state.showCustomRoomOptions &&
                    <div>
                      <br />
                      <Form inline>
                        <FormGroup controlId='room-name'>
                          <FormControl type='text' size={30} placeholder={this.state.roomNamePlaceholder} onChange={this.onRoomNameChanged} />
                        </FormGroup>{' '}
                        <Button
                          bsStyle='warning'
                          disabled={!this.state.roomName}
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
                  }
                </div>
              )
            }
          </Col>
        </Row>
      </div>
    )
  }
}

JoinOrCreateRoom.propTypes = {
  roomId: PropTypes.string
}
