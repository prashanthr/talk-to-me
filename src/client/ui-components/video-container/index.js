import React, { Component } from 'react'
import VideoPlayer from '../video'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { map, filter } from 'lodash'
import createObjectUrl from '../../utils/create-object-url'

class VideoContainer extends Component {
  constructor (props) {
    super(props)
    this.videoRef = null
  }

  playStream (event) {
    event.preventDefault
    event.target.play()
  }

  render () {
    return (
      <div>
        {<span>{`USER>>>${this.props.user.socket.id}`}</span>}
        <VideoPlayer
          src={this.props.user.streamUrl}
          muted
          onLoadedMetadata={this.playStream}
        />
        <br />
        {map(this.props.peer, (peer, peerId) => (
          <div>
            {<span key={peerId}>{`PEER>>>${peer.socketId}`}</span>}
            <VideoPlayer
              src={peer.streamUrl || (peer.stream ? createObjectUrl(peer.stream) : '')}
              key={peerId || peer.socketId}
              onLoadedMetadata={this.playStream}
            />
            <br />
          </div>
        ))}
      </div>
    )
  }
}

VideoContainer.propTypes = {
  user: PropTypes.shape({
    streamUrl: PropTypes.string
  }),
  peer: PropTypes.object
}

VideoContainer.defaultProps = {
}

function mapStateToProps (state, ownProps) {
  return {
    user: state.user,
    peer: filter(state.peer, (peer, peerId) => peerId !== state.user.socket.id) // Don't render user stream again
  }
}

export default connect(mapStateToProps, {})(VideoContainer)
