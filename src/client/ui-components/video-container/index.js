import React, { Component } from 'react'
import VideoPlayer from '../video'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { map } from 'lodash'
import createObjectUrl from '../../utils/create-object-url'
import cuid from 'cuid'
import { Grid } from 'semantic-ui-react'

class VideoContainer extends Component {
  constructor (props) {
    super(props)
    this.videoRef = null
  }

  playStream (event) {
    event.preventDefault()
    event.target.play()
  }

  render () {
    return (
      <div>
        <Grid columns={3}>
          <Grid.Column>
            <VideoPlayer
              metadata={this.props.user.socket ? this.props.user.socket.id : null}
              src={this.props.user.streamUrl}
              muted
              onLoadedMetadata={this.playStream}
            />
          </Grid.Column>
          <Grid.Column>
            <span />
          </Grid.Column>
          <Grid.Column>
            {map(this.props.peer, (peer, peerId) => (
              <VideoPlayer
                metadata={peer.socketId}
                src={peer.streamUrl || (peer.stream ? createObjectUrl(peer.stream) : '')}
                key={cuid()}
                onLoadedMetadata={this.playStream}
              />
            ))}
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

VideoContainer.propTypes = {
  user: PropTypes.shape({
    streamUrl: PropTypes.string,
    socket: PropTypes.object
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
