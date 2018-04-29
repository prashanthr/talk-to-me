import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Toolbar from './index'
import SoundcheckWrapper from '../soundcheck/soundcheck-wrapper'

class ToolbarWrapper extends Component {
  constructor (props) {
    super(props)
    this.onExitRoom = this.onExitRoom.bind(this)
    this.onSettingsClick = this.onSettingsClick.bind(this)
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
    window.location.replace('/')
  }

  render () {
    const menuItems = [{
      key: 'room',
      label: `Room - ${this.props.roomId}`,
      icon: 'setting',
      onClick: (event) => event.preventDefault()
    },{
      key: 'setting',
      label: 'Settings',
      icon: 'setting',
      onClick: this.onSettingsClick
    }, {
      key: 'exit',
      label: 'Exit Room',
      icon: 'external',
      onClick: this.onExitRoom
    }]
    return (
      <div>
        <Toolbar
          items={menuItems}
        />
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
