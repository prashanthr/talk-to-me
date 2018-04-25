
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Modal } from 'react-bootstrap'
import Soundcheck from './index'
import { connect } from 'react-redux'
import { initializeSoundcheck } from '../../redux/ducks/soundcheck'

class SoundcheckWrapper extends Component {
  componentWillReceiveProps (nextProps) {
    if (this.props.show !== nextProps.show && nextProps.show) {
      console.log(this.props, nextProps)
      this.props.initializeSoundcheck()
    }
  }

  render () {
    return (
      <Modal
        show={this.props.show}
        onHide={this.props.onClose}
      >
        <Modal.Header closeButton>
          Soundcheck
        </Modal.Header>
        <Modal.Body>
          <Soundcheck
            deviceInfo={this.props.deviceInfo}
          />
        </Modal.Body>
      </Modal>
    )
  }
}

SoundcheckWrapper.propTypes = {
  onClose: PropTypes.func,
  show: PropTypes.bool,
  initializeSoundcheck: PropTypes.bool,
  deviceInfo: PropTypes.object
}

function mapStateToProps (state) {
  return {
    deviceInfo: state.soundcheck
  }
}

export default connect(mapStateToProps, { initializeSoundcheck })(SoundcheckWrapper)
