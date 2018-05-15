import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Toolbar from './index'
import SoundcheckWrapper from '../soundcheck/soundcheck-wrapper'
import ShareRoom from '../share-room'
import Modal from '../modal'
import { goToUrl } from '../../utils/window'

class ToolbarWrapper extends Component {
  constructor (props) {
    super(props)
    this.onExitRoom = this.onExitRoom.bind(this)
    this.onSettingsClick = this.onSettingsClick.bind(this)
    this.onRoomNameClick = this.onRoomNameClick.bind(this)
    this.showModal = this.showModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.onFeedbackClick = this.onFeedbackClick.bind(this)
    this.state = {
      showSettingsModal: false,
      modal: {
        show: false,
        content: null,
        header: null,
        onClose: () => {}
      }
    }
  }

  toggleSettingsModalState = () => this.setState({
    showSettingsModal: !this.state.showSettingsModal
  })

  onSettingsClick () {
    this.toggleSettingsModalState()
  }

  onExitRoom () {
    this.props.onLeaveRoom()
    // @todo: Move to router history
    goToUrl('/', 'Talk to Me')
  }

  onFeedbackClick (event) {
    event.preventDefault()
    // show modal from user-report
    window._urq.push(['Feedback_Open'])
  }

  onRoomNameClick (event) {
    event.preventDefault()
    const url = window.location.href
    this.showModal({
      header: `Share Room - ${this.props.roomId}`,
      content: <ShareRoom
        url={url} />
    })
  }

  showModal ({ header, content, onClose }) {
    this.setState({
      modal: {
        show: true,
        header,
        content,
        onClose: onClose ? onClose : this.closeModal
      }
    })
  }

  closeModal () {
    this.setState({
      modal: {
        show: false,
        header: null,
        content: null,
        onClose: () => {}
      }
    })
  }


  render () {
    const menuItems = [{
      key: 'room',
      icon: 'share-alt',
      label: `Share`,
      onClick: this.onRoomNameClick
    },{
      key: 'setting',
      label: 'Settings',
      icon: 'cog',
      onClick: this.onSettingsClick
    }, {
      key: 'feedback-bug',
      label: 'Feedback',
      icon: 'comment',
      onClick: this.onFeedbackClick
    },{
      key: 'exit',
      label: 'Exit',
      icon: 'remove-circle',
      onClick: this.onExitRoom
    }]
    return (
      <div>
        <Modal
          show={this.state.modal.show}
          content={this.state.modal.content}
          header={this.state.modal.header}
          onClose={this.state.modal.onClose}
        />
        <Toolbar
          items={menuItems}
        />
        <input className='room-name-copy' type="hidden" value={this.props.roomId} id='room-name-copy' onChange={event => event.preventDefault()} />
        <SoundcheckWrapper 
          show={this.state.showSettingsModal}
          onClose={this.toggleSettingsModalState}
        />
      </div>
    )
  }
}

ToolbarWrapper.propTypes = {
  roomId: PropTypes.string,
  onLeaveRoom: PropTypes.func,
  history: PropTypes.any
}

export default ToolbarWrapper
