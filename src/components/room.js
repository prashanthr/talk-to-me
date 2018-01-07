import React, { Component } from 'react'
import PropTypes from 'prop-types'
import VideoContainer from './video-container'
import { stream, streamSelf } from '../peer/simple-peer'
import { connect } from 'react-redux'
import { joinRoom, loadRoom, findPeers } from '../actions/session'

class Room extends Component {
  stream () {
    if (this.props.peers && this.props.peers.length > 0) {
      stream(this.props.peers[0].connection)
    }
  }
  streamSelf () {
    streamSelf()
  }
  componentDidMount () {
    this.props.loadRoom(this.props.roomId)
  }
  componentWillReceiveProps (nextProps) {
    if (this.props.room !== nextProps.room) {
      this.props.joinRoom('abc', this.props.roomId)
    }
    if (this.props.peers !== nextProps.peers) {
      this.stream()
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
  peers: PropTypes.array,
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
