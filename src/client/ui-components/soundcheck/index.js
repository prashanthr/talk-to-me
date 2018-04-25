import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'react-bootstrap'

class Soundcheck extends Component {
  render () {
    return (
      <div>
        <Row>
          <Col>
            Video: {this.props.deviceInfo.devices[this.props.deviceInfo.defaultVideoInputId].label}
          </Col>
        </Row>
        <Row>
          <Col>
            AudioIn: {this.props.deviceInfo.devices[this.props.deviceInfo.defaultAudioInputId].label}
          </Col>
        </Row>
        <Row>
          <Col>
            AudioOut: {this.props.deviceInfo.devices[this.props.deviceInfo.defaultAudioOutputId].label}
          </Col>
        </Row>
      </div>
    )
  }
}

Soundcheck.propTypes = {
  deviceInfo: PropTypes.object
}

export default Soundcheck
