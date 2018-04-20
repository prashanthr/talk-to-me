import React, { Component } from 'react'
import VideoContainer from '../../ui-components/video-container'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { initialize, shutdown } from '../../redux/ducks/room'

class Room extends Component {
  componentWillMount () {
    this.props.initialize(this.props.roomId)
  }
  componentWillUnmount () {
    this.props.shutdown(this.props.roomId)
  }

  render () {
    return (
      <div>
        {`Welcome to Room ${this.props.roomId}`}
        <br />
        {this.props.error
          ? 'Encountered an error getting streams'
          : (
            this.props.user && this.props.user.streamUrl
            ? <VideoContainer />
            : 'Initializing streams...'
          )
        }
      </div>
    )
  }
}

Room.propTypes = {
  roomId: PropTypes.string,
  user: PropTypes.object,
  error: PropTypes.any,
  initialize: PropTypes.func,
  shutdown: PropTypes.func
}

function mapStateToProps (state, ownProps) {
  return {
    roomId: ownProps && ownProps.match ? ownProps.match.params.id : null,
    error: state.room.error,
    user: state.user
  }
}

export default connect(mapStateToProps, { initialize, shutdown })(Room)
