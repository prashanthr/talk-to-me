import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Toolbar from './index'
import SoundcheckWrapper from '../soundcheck/soundcheck-wrapper'
import { goToUrl } from '../../utils/window'

class ToolbarWrapper extends Component {
  constructor (props) {
    super(props)
    this.onExitRoom = this.onExitRoom.bind(this)
    this.onSettingsClick = this.onSettingsClick.bind(this)
    this.onRoomNameClick = this.onRoomNameClick.bind(this)
    this.state = {
      showSettingsModal: false
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

  onRoomNameClick (event) {
    event.preventDefault()
    document.getElementById('room-name-copy').select()
    document.execCommand('Copy')
  }


  render () {
    const menuItems = [{
      key: 'room',
      label: `Room - ${this.props.roomId}`,
      onClick: this.onRoomNameClick
    },{
      key: 'setting',
      label: ' Settings',
      icon: 'cog',
      onClick: this.onSettingsClick
    }, {
      key: 'exit',
      label: ' Exit Room',
      icon: 'remove-circle',
      onClick: this.onExitRoom
    }]
    return (
      <div>
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
