import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ToggleButton from '../toggle-button'
import { Row, Col, FormControl, FormGroup, Button } from 'react-bootstrap'
import Emoji from '../emoji'
import { map, filter, values } from 'lodash'
import { setLocalStorage } from '../../utils/window'
import config from '../../config'
import './index.css'

const getDevices = (devices, kind) => filter(devices, (device, deviceId) => device.kind === kind)
const getVideoInputDevices = devices => getDevices(devices, 'videoinput')
const getAudioInputDevices = devices => getDevices(devices, 'audioinput')
const getAudioOutputDevices = devices => getDevices(devices, 'audiooutput')

class Soundcheck extends Component {
  constructor (props) {
    super(props)
    this.onDeviceChanged = this.onDeviceChanged.bind(this)
    this.onSoundcheckSave = this.onSoundcheckSave.bind(this)
    this.onClearSoundcheckCache = this.onClearSoundcheckCache.bind(this)
    this.state = {
      videoInput: null,
      audioInput: null,
      audioOutput: null,
      audioEnabled: this.props.audioEnabled,
      videoEnabled: this.props.videoEnabled
    }
  }

  componentWillReceiveProps (nextProps) {
    if (this.props !== nextProps) {
      if (this.state.audioEnabled !== nextProps.audioEnabled) {
        this.setState({
          audioEnabled: nextProps.audioEnabled
        })
      }
      if (this.state.videoEnabled !== nextProps.videoEnabled) {
        this.setState({
          videoEnabled: nextProps.videoEnabled
        })
      }
    }
  }

  onDeviceChanged (stateProperty, event) {
    event.preventDefault()
    this.setState({
      [stateProperty]: event.target.value
    })
  }

  onClearSoundcheckCache () {
    setLocalStorage(config.localStorage.gumConstraints, null)
  }

  onSoundcheckSave (event) {
    event.preventDefault()
    console.log('device changes', this.state)
    if (filter(values(this.state), value => value !== null).length > 0) {
      this.props.onSoundcheckUpdate({
        ...this.state,
        audioEnabled: this.state.audioEnabled !== undefined ? this.state.audioEnabled : this.props.audioEnabled,
        videoEnabled: this.state.audioEnabled !== undefined ? this.state.videoEnabled : this.props.videoEnabled,
      })
    }
    this.props.onClose()
  }

  renderDropdownMenu = (items, selectedKey, onChange) => {
    return (
      <FormGroup>
        <FormControl 
          componentClass='select' 
          placeholder='Select source'
          selected={selectedKey}
          onChange={onChange}
        >
          {
            map(items, item => (
              <option 
                key={item.key}
                value={item.key}
              >
                {item.label}
              </option>
            ))
          }
        </FormControl>
      </FormGroup>
    )
  }

  render () {
    if (!this.props.devices) return null
    return (
      <div>
        <Row>
          <Col md={5}>
            Media Type
          </Col>
          <Col md={5}>
            Device
          </Col>
          <Col md={2}>
            On / Off
          </Col>
        </Row>
        <br />
        <Row>
          <Col md={5}>
            Video Input <Emoji emoji='🎥' label='camera' />
          </Col>
          <Col md={5}>
            {this.renderDropdownMenu(
              map(getVideoInputDevices(this.props.devices), device => ({
                key: `${device.kind}-${device.deviceId}`,
                label: device.label
              })),
              this.props.videoInput.id,
              event => this.onDeviceChanged('videoInput', event)
            )}
          </Col>
          <Col md={2}>
            <ToggleButton 
              enabled={this.state.videoEnabled} 
              onChange={event => {
                if (event && event.target.checked !== undefined) {
                  this.setState({
                    videoEnabled: event.target.checked
                  })
                }
              }} />
          </Col>
        </Row>
        <Row>
          <Col md={5}>
            Audio Input <Emoji emoji='🎙️' label='microphone' />
          </Col>
          <Col md={5}>
            {this.renderDropdownMenu(
              map(getAudioInputDevices(this.props.devices), device => ({
                key: `${device.kind}-${device.deviceId}`,
                label: device.label
              })),
              this.props.audioInput.id,
              event => this.onDeviceChanged('audioInput', event)
            )}
          </Col>
          <Col md={2}>
            <ToggleButton 
              enabled={this.state.audioEnabled} 
              onChange={event => {
                if (event && event.target.checked !== undefined) {
                  this.setState({
                    audioEnabled: event.target.checked
                  })
                }
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col md={5}>
            Audio Output <Emoji emoji='🔈' label='speaker' />
          </Col>
          <Col md={5}>
            {this.renderDropdownMenu(
              map(getAudioOutputDevices(this.props.devices), device => ({
                key: `${device.kind}-${device.deviceId}`,
                label: device.label
              })),
              this.props.audioOutput.id,
              event => this.onDeviceChanged('audioOutput', event)
            )}
          </Col>
          <Col md={2} />
        </Row>
        <Row>
            <Col md={5}>
              <Button
                onClick={this.onClearSoundcheckCache}
              >
                Clear cache
              </Button>
            </Col>
            <Col md={5} className='foot-note'>
              Note: Your page will reload after save
            </Col>
            <Col md={2}>
              <Button
                bsStyle='primary'
                onClick={this.onSoundcheckSave}
              >
                Save
              </Button>            
            </Col>
        </Row>
      </div>
    )
  }
}

Soundcheck.propTypes = {
  devices: PropTypes.object,
  audioInput: PropTypes.object,
  audioOutput: PropTypes.object,
  videoInput: PropTypes.object,
  videoEnabled: PropTypes.bool,
  audioEnabled: PropTypes.bool,
  onSoundcheckUpdate: PropTypes.func,
  onClose: PropTypes.func
}

export default Soundcheck
