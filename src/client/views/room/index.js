import React, { Component } from 'react'
import VideoContainer from '../../ui-components/video-container'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { initialize } from '../../redux/ducks/room'

class Room extends Component {
  componentWillMount () {
    console.log('willMount', this.props)
    this.props.initialize(this.props.roomId)
  }

  render () {
    return (
      <div>
        Hello Room!
        {this.props.user && this.props.user.streamUrl && <VideoContainer />}
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
  console.log('ownProps', ownProps)
  return {
    roomId: ownProps && ownProps.match ? ownProps.match.params.id : null,
    user: state.user
  }
}

export default connect(mapStateToProps, { initialize })(Room)
