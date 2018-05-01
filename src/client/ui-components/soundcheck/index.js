import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Row, Col, FormControl, FormGroup, Button } from 'react-bootstrap'
import { map, filter, values } from 'lodash'

const getDevices = (devices, kind) => filter(devices, (device, deviceId) => device.kind === kind)
const getVideoInputDevices = devices => getDevices(devices, 'videoinput')
const getAudioInputDevices = devices => getDevices(devices, 'audioinput')
const getAudioOutputDevices = devices => getDevices(devices, 'audiooutput')

class Soundcheck extends Component {
  constructor (props) {
    super(props)
    this.onDeviceChanged = this.onDeviceChanged.bind(this)
    this.onSoundcheckSave = this.onSoundcheckSave.bind(this)
    this.state = {
      videoInput: null,
      audioInput: null,
      audioOutput: null
    }
  }

  onDeviceChanged (stateProperty, event) {
    event.preventDefault()
    this.setState({
      [stateProperty]: event.target.value
    })
  }

  onSoundcheckSave (event) {
    event.preventDefault()
    console.log('device changes', this.state)
    if (filter(values(this.state), value => value !== null).length > 0) {
      this.props.onSoundcheckUpdate(this.state)
    }
    this.props.onClose()
  }

  renderDropdownMenu = (items, selectedKey, onChange) => {
    return (
      <FormGroup>
        <FormControl 
          componentClass="select" 
          placeholder="Select source"
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
          <Col md={6}>
            Video Source
          </Col>
          <Col md={6}>
            {this.renderDropdownMenu(
              map(getVideoInputDevices(this.props.devices), device => ({
                key: `${device.kind}-${device.deviceId}`,
                label: device.label
              })),
              this.props.videoInput.id,
              event => this.onDeviceChanged('videoInput', event)
            )}
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            Audio Input Source
          </Col>
          <Col md={6}>
            {this.renderDropdownMenu(
              map(getAudioInputDevices(this.props.devices), device => ({
                key: `${device.kind}-${device.deviceId}`,
                label: device.label
              })),
              this.props.audioInput.id,
              event => this.onDeviceChanged('audioInput', event)
            )}
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            Audio Output Source
          </Col>
          <Col md={6}>
            {this.renderDropdownMenu(
              map(getAudioOutputDevices(this.props.devices), device => ({
                key: `${device.kind}-${device.deviceId}`,
                label: device.label
              })),
              this.props.audioOutput.id,
              event => this.onDeviceChanged('audioOutput', event)
            )}
          </Col>
        </Row>
        <Row>
            <Col md={6} />
            <Col md={6}>
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
  onSoundcheckUpdate: PropTypes.func,
  onClose: PropTypes.func
}

export default Soundcheck
