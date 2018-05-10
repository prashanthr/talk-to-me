
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Modal } from 'react-bootstrap'
import Soundcheck from './index'
import { connect } from 'react-redux'
import { initializeSoundcheck, onSoundcheckUpdate } from '../../redux/ducks/soundcheck'

class SoundcheckWrapper extends Component {
  componentWillReceiveProps (nextProps) {
    if (this.props.show !== nextProps.show && nextProps.show) {
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
          Audio / Video Settings
        </Modal.Header>
        <Modal.Body>
          <Soundcheck
            devices={this.props.devices}
            videoEnabled={this.props.videoEnabled}
            audioEnabled={this.props.audioEnabled}
            videoInput={this.props.videoInput}
            audioInput={this.props.audioInput}
            audioOutput={this.props.audioOutput}
            onSoundcheckUpdate={this.props.onSoundcheckUpdate}
            onClose={this.props.onClose}
          />
        </Modal.Body>
      </Modal>
    )
  }
}

SoundcheckWrapper.propTypes = {
  onClose: PropTypes.func,
  show: PropTypes.bool,
  initializeSoundcheck: PropTypes.func,
  devices: PropTypes.object,
  videoEnabled: PropTypes.bool,
  audioEnabled: PropTypes.bool,
  videoInput: PropTypes.object,
  audioInput: PropTypes.object,
  audioOutput: PropTypes.object,
  onSoundcheckUpdate: PropTypes.func
}

function mapStateToProps (state) {
  return {
    devices: state.soundcheck.devices,
    videoEnabled: state.soundcheck.videoEnabled,
    audioEnabled: state.soundcheck.audioEnabled,
    videoInput: {
      id: state.soundcheck.defaultVideoInputId,
      label: state.soundcheck.devices[state.soundcheck.defaultVideoInputId]
        ? state.soundcheck.devices[state.soundcheck.defaultVideoInputId].label
        : null
    },
    audioInput: {
      id: state.soundcheck.defaultAudioInputId,
      label: state.soundcheck.devices[state.soundcheck.defaultAudioInputId]
        ? state.soundcheck.devices[state.soundcheck.defaultAudioInputId].label
        : null
    },
    audioOutput: {
      id: state.soundcheck.defaultAudioOutputId,
      label: state.soundcheck.devices[state.soundcheck.defaultAudioOutputId]
      ? state.soundcheck.devices[state.soundcheck.defaultAudioOutputId].label
      : null
    }
  }
}

export default connect(mapStateToProps, { initializeSoundcheck, onSoundcheckUpdate })(SoundcheckWrapper)
