import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'react-bootstrap'

class Soundcheck extends Component {
  render () {
    if (!this.props.devices) return null
    return (
      <div>
        <Row>
          <Col>
            Video Source: {`${this.props.videoInput.label}`}
          </Col>
        </Row>
        <Row>
          <Col>
            Audio Input Source: {`${this.props.audioInput.label}`}
          </Col>
        </Row>
        <Row>
          <Col>
            Audio Output Source: {`${this.props.audioOutput.label}`}
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
