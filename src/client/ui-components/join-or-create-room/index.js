import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Form, FormGroup, FormControl, Button } from 'react-bootstrap'
import DropdownMenu from '../dropdown-menu'
import Emoji from '../emoji'
import { generateName, urlSafe } from '../../utils/room'
import { goToUrl, setLocalStorage } from '../../utils/window'
import config from '../../config'
import './index.css'

const emojiLightBulb = <Emoji emoji={'💡'} label='genie' />
const emojiSparkle = <Emoji emoji={'✨'} label='sparkle' />

export default class JoinOrCreateRoom extends Component {
  constructor (props) {
    super(props)
    this.onRoomNameChanged = this.onRoomNameChanged.bind(this)
    this.onCustomizeRoom = this.onCustomizeRoom.bind(this)
    this.onMediaSourceChanged = this.onMediaSourceChanged.bind(this)
    this.getRoomDisplayName = this.getRoomDisplayName.bind(this)
    this.gotoCustomRoom = this.gotoCustomRoom.bind(this)
    this.state = {
      showCustomRoomOptions: false,
      roomNamePlaceholder: generateName(true),
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
  getRoomDisplayName (roomId) {
    let roomName
    if (roomId.length > 25) {
      roomName = `${roomId.substring(0, 25)}...`
    } else {
      roomName = roomId
    }
    return `Join Room ${roomName}`
  }

  gotoCustomRoom (event) {
    event.preventDefault()
    if (this.state.roomName) {
      this.gotoRoom(urlSafe(this.state.roomName))
    }
  }

  render () {
    const mediaSourceOptions = [{
      key: 'av',
      label: `Audio & Video (Default)`
    }, {
      key: 'a',
      label: `Audio only`
    }, {
      key: 'v',
      label: `Video only`
    }]
    return (
      <div>
        <Row>
          <Col md={12}>
            <h2 className='settings-header'>Check your settings</h2><br />
            <Row>
              <Col md={3}>
                <span style={{ fontSize: '16px' }}>
                  <label className='settings-header'>
                    Device Options 
                  </label>
                  <br />(You can change this later)
                </span>
              </Col>
              <Col md={9}>
                <DropdownMenu
                  items={mediaSourceOptions}
                  selectedKey={mediaSourceOptions[0].key}
                  onChange={this.onMediaSourceChanged}
                />
              </Col>
            </Row>
          </Col>
        </Row>
        <br />
        <Row>
          <Col md={12}>
            <label className='settings-header'>Room Options</label>
            {this.props.roomId && (
                <div>
                  &nbsp;
                  <br />
                  <Button
                    bsStyle={'primary'}
                    onClick={event => {
                      event.preventDefault()
                      this.gotoRoom(this.props.roomId)
                    }}
                  >
                    {this.getRoomDisplayName(this.props.roomId)}
                  </Button>
                  <br /><br /><br />
                  <hr />
                  <h3>OR</h3>
                </div>
            )}
                <div>
                  <Row>
                    <Col md={3}>
                      <span>Create your own:</span>&nbsp;&nbsp;
                    </Col>
                    <Col md={9}>
                      <div>
                        <Form
                          inline
                          onSubmit={this.gotoCustomRoom}
                        >
                          <FormGroup controlId='room-name'>
                            <FormControl type='text' size={30} placeholder={this.state.roomNamePlaceholder} onChange={this.onRoomNameChanged} />
                          </FormGroup>{' '}
                          <Button
                            bsStyle='primary'
                            disabled={!this.state.roomName}
                            onClick={this.gotoCustomRoom}
                          >
                            Create Room {emojiLightBulb}
                          </Button>
                        </Form>
                      </div>
                    </Col>
                  </Row>
                  <br />
                  <Row>
                    <Col md={3}>
                      Make your own:
                    </Col>
                    <Col md={9}>
                      <Button
                        bsStyle='primary'
                        onClick={event => {
                          event.preventDefault()
                          this.gotoRoom(generateName())
                        }}
                      >
                        Create Random Room {emojiSparkle}
                      </Button>
                    </Col>
                  </Row>
                </div>
          </Col>
        </Row>
      </div>
    )
  }
}

JoinOrCreateRoom.propTypes = {
  roomId: PropTypes.string
}
