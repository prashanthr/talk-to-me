
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Modal } from 'react-bootstrap'
import './index.css'

class ModalWrapper extends Component {
  render () {
    return (
      <Modal
        show={this.props.show}
        onHide={this.props.onClose}
      >
        <Modal.Header
          className='modal-header'
          closeButton
        >
          {this.props.header}
        </Modal.Header>
        <Modal.Body>
          {this.props.content}
        </Modal.Body>
      </Modal>
    )
  }
}

ModalWrapper.propTypes = {
  onClose: PropTypes.func,
  show: PropTypes.bool,
  content: PropTypes.any,
  header: PropTypes.string
}

export default ModalWrapper
