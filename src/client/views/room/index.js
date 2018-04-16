import React, { Component } from 'react'
import VideoContainer from '../../ui-components/video-container'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { initialize } from '../../redux/ducks/room'

class Room extends Component {
  componentWillMount () {
    this.props.initialize(this.props.roomId)
  }

  render () {
    return (
      <div>
        {`Welcome to Room ${this.props.roomId}`}
        <br />
        {this.props.user && this.props.user.streamUrl
          ? <VideoContainer />
          : 'Initializing streams...'
        }
      </div>
    )
  }
}

Room.propTypes = {
  roomId: PropTypes.string,
  initialize: PropTypes.func,
  user: PropTypes.object
}

function mapStateToProps (state, ownProps) {
  return {
    roomId: ownProps && ownProps.match ? ownProps.match.params.id : null,
    user: state.user
  }
}

export default connect(mapStateToProps, { initialize })(Room)
