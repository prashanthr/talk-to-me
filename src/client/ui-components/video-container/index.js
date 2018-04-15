import React, { Component } from 'react'
import VideoPlayer from '../video'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { map } from 'lodash'
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
        <VideoPlayer
          src={this.props.user.streamUrl}
          muted
          onLoadedMetadata={this.playStream}
        />
        <br />
        {map(this.props.peer, (peer, peerId) => (
          <VideoPlayer
            key={peerId || peer.socketId}
            onLoadedMetadata={this.playStream}
            // src={peer.streamUrl || createObjectUrl(peer.channel.stream)}
          />
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
    peer: state.peer
  }
}

export default connect(mapStateToProps, {})(VideoContainer)
