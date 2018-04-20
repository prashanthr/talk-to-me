import React, { Component } from 'react'
import PropTypes from 'prop-types'
import VideoContainer from '../../ui-components/video-container'
import ToolbarWrapper from '../../ui-components/toolbar/toolbar-wrapper'
import { Grid } from 'semantic-ui-react'
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
        <Grid.Row columns={2}>
          <Grid.Column style={{ float: 'left' }}>
            {`Welcome to Room ${this.props.roomId}`}
          </Grid.Column>
          <Grid.Column style={{ float: 'right' }}>
            <ToolbarWrapper
              onLeaveRoom={this.props.shutdown}
            />
          </Grid.Column>
        </Grid.Row>
        <br />
        <Grid.Row>
          {this.props.error
            ? 'Encountered an error getting streams'
            : (
              this.props.user && this.props.user.streamUrl
              ? <VideoContainer />
              : 'Initializing streams...'
            )
          }
        </Grid.Row>
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
