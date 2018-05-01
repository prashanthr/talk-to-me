import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Row, Col, FormControl, FormGroup } from 'react-bootstrap'
import { map, filter } from 'lodash'

const getDevices = (devices, kind) => filter(devices, (device, deviceId) => device.kind === kind)
const getVideoInputDevices = devices => getDevices(devices, 'videoinput')
const getAudioInputDevices = devices => getDevices(devices, 'audioinput')
const getAudioOutputDevices = devices => getDevices(devices, 'audiooutput')

class Soundcheck extends Component {
  renderDropdownMenu = (items, selectedKey) => {
    return (
      <FormGroup>
        <FormControl 
          componentClass="select" 
          placeholder="Select source"
          selected={selectedKey}
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
              this.props.videoInput.id
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
              this.props.audioInput.id
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
              this.props.audioOutput.id
            )}
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
  videoInput: PropTypes.object
}

export default Soundcheck
