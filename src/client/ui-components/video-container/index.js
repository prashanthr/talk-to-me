import React, { Component } from 'react'
import VideoPlayer from '../video'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { map, keys, chunk } from 'lodash'
import createObjectUrl from '../../utils/create-object-url'
import cuid from 'cuid'
import { Grid, Row, Col } from 'react-bootstrap'
import './index.css'

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
    const rowSets = chunk(keys(this.props.users), this.props.usersPerRow)
    return (
      <Grid fluid>
        {
          map(rowSets, (rowUsers, index) => (
            <Row key={`row-${index}`} className='show-grid flex'>
              {map(rowUsers, userId => (
                <Col md={4} key={`col-${index}-${userId}`} className='video-col'>
                  <VideoPlayer
                    metadata={this.props.users[userId].socketId}
                    src={this.props.users[userId].streamUrl || (this.props.users[userId].stream ? createObjectUrl(this.props.users[userId].stream) : '')}
                    key={cuid()}
                    muted={true || this.props.users[userId].isVideoMuted}
                    onLoadedMetadata={this.playStream}
                  />
                </Col>
              ))}
            </Row>
          ))
        }
      </Grid>
    )
  }
}

VideoContainer.propTypes = {
  user: PropTypes.shape({
    streamUrl: PropTypes.string,
    socket: PropTypes.object
  }),
  peer: PropTypes.object,
  users: PropTypes.object,
  usersPerRow: PropTypes.number
}

VideoContainer.defaultProps = {
  usersPerRow: 3
}

function mapStateToProps (state, ownProps) {
  const userSocketId = state.user && state.user.socket ? state.user.socket.id : null
  return {
    // user: state.user,
    // peer: state.peer,
    // numberOfUsers: (state.user ? 1 : 0) + (state.peer ? keys(state.peer) : 0),
    users: {
      ...state.peer,
      [userSocketId]: {
        streamUrl: state.user ? state.user.streamUrl : null,
        socketId: userSocketId,
        isVideoMuted: true
      }
    }
  }
}

export default connect(mapStateToProps, {})(VideoContainer)
