import React, { Component } from 'react'
import PropTypes from 'prop-types'
import VideoContainer from './video-container'
import { stream } from '../peer/simple-peer'
import { connect } from 'react-redux'
import { joinRoom, loadRoom, findPeers } from '../actions/session'
import { keys } from 'lodash'

class Room extends Component {
  componentDidMount () {
    this.props.loadRoom(this.props.roomId)
  }
  componentWillReceiveProps (nextProps) {
    if (this.props.room !== nextProps.room) {
      console.log('roomId to reg', nextProps.roomId)
      this.props.joinRoom('abc', nextProps.roomId)
    }
    if (this.props.peers !== nextProps.peers && keys(nextProps.peers).length > 0) {
      stream(keys(nextProps.peers)[0].connection, 'video-box-2')
    } else {
      stream(undefined)
    }
  }
  render () {
    if (!this.props.user) {
      return <div>Registering...</div>
    }
    return <VideoContainer />
  }
}

Room.propTypes = {
  peers: PropTypes.object,
  user: PropTypes.object,
  room: PropTypes.object,
  roomId: PropTypes.string,
  joinRoom: PropTypes.func,
  loadRoom: PropTypes.func,
  findPeers: PropTypes.func
}

function mapStateToProps (state) {
  console.log('state', state)
  const props = {
    peers: state.session.peers,
    roomId: state.router.location.pathname.replace('/room/', ''),
    room: state.session.activeRoom,
    user: state.session.user
  }
  console.log('props', props)
  return props
}

export default connect(mapStateToProps, { joinRoom, loadRoom, findPeers })(Room)
