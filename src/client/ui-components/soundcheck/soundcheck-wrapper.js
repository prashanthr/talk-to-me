
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Modal } from 'semantic-ui-react'
import Soundcheck from './index'

class SoundcheckWrapper extends Component {
  render () {
    return (
      <Modal
        open={this.props.show}
        closeOnDimmerClick
        closeOnDocumentClick
        onClose={this.props.onClose}
      >
        <Modal.Header>Soundcheck</Modal.Header>
        <Modal.Content>
          <Soundcheck />
        </Modal.Content>
      </Modal>
    )
  }
}

SoundcheckWrapper.propTypes = {
  onClose: PropTypes.func,
  show: PropTypes.bool
}

export default SoundcheckWrapper
