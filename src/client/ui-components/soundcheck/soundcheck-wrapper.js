
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Modal } from 'react-bootstrap'
import Soundcheck from './index'

class SoundcheckWrapper extends Component {
  render () {
    return (
      <Modal
        {...this.props}
        show={this.props.show}
        onHide={this.props.onClose}
      >
        <Modal.Header closeButton>
          Soundcheck
        </Modal.Header>
        <Modal.Body>
          <Soundcheck />
        </Modal.Body>
      </Modal>
    )
  }
}

SoundcheckWrapper.propTypes = {
  onClose: PropTypes.func,
  show: PropTypes.bool
}

export default SoundcheckWrapper
