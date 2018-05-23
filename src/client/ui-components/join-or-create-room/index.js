import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Form, FormGroup, FormControl, Button } from 'react-bootstrap'
import DropdownMenu from '../dropdown-menu'
import Emoji from '../emoji'
import { generateName, urlSafe, generateNickname } from '../../utils/room'
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
    this.onNicknameChanged = this.onNicknameChanged.bind(this)
    this.state = {
      showCustomRoomOptions: false,
      roomNamePlaceholder: generateName(false),
      roomName: null,
      nickname: null,
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
  onNicknameChanged (event) {
    event.preventDefault()
    this.setState({
      nickname: event.target.value
    })
  }
  gotoRoom (roomName) {
    const path = `/room/${roomName}`
    const title = `Room - ${roomName}`
    setLocalStorage(config.localStorage.nickname, this.state.nickname || generateNickname())
    goToUrl(path, title)
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
            <label>Settings</label>
            <Row>
              <Col md={6}>
                <span style={{ fontSize: '16px' }}>
                  Device Options
                </span>
              </Col>
              <Col md={6}>
                <DropdownMenu
                  items={mediaSourceOptions}
                  selectedKey={mediaSourceOptions[0].key}
                  onChange={this.onMediaSourceChanged}
                />
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <span style={{ fontSize: '16px' }}>
                  Nickname
                </span>
              </Col>
              <Col md={6}>
                <Form inline>
                  <FormGroup controlId='room-name'>
                    <FormControl type='text' size={30} placeholder={'(Optional)'} onChange={this.onNicknameChanged} />
                  </FormGroup>{' '}
                </Form>
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
                  <Row>
                    <Col md={5}>
                      <Button
                        bsStyle='primary'
                        onClick={event => {
                          event.preventDefault()
                          this.gotoRoom(generateName())
                        }}
                      >
                        Create New Room {emojiLightBulb}
                      </Button>
                    </Col>
                    <Col md={2}>
                      OR
                    </Col>
                    <Col md={5}>
                      <Button
                        onClick={this.onCustomizeRoom}
                      >
                        Customize Room {emojiGenie}
                      </Button>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={12}>
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
                    </Col>
                  </Row>
                  <br />
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
