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
    const force = window.confirm('Are you sure you want to leave the room?') 
    if (force) {
      this.props.onLeaveRoom()
      // @todo: Move to router history
      goToUrl('/', 'Talk to Me')
    }
  }

  onRoomNameClick (event) {
    event.preventDefault()
    const url = window.location.href
    this.showModal({
      header: `Share Room - ${this.props.roomId}`,
      content: (
        <ShareRoom
          url={url} />
      )
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
      key: 'exit',
      label: 'Exit',
      icon: 'remove-circle',
      onClick: this.onExitRoom
    },{
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
      key: 'chat',
      label: 'Chat',
      icon: 'chat',
      onClick: this.props.onToggleChat
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
  onToggleChat: PropTypes.func,
  history: PropTypes.any
}

export default ToolbarWrapper
