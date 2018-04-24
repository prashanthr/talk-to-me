import React, { Component } from 'react'
import VideoPlayer from '../video'
import { Grid, Row, Col } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { onMute } from '../../redux/ducks/room'
import { map, keys, chunk } from 'lodash'
import createObjectUrl from '../../utils/create-object-url'
import './index.css'

class VideoContainer extends Component {
  constructor (props) {
    super(props)
    this.videoRef = null
    this.playStream = this.playStream.bind(this)
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
                <Col md={12 / rowUsers.length} key={`col-${index}-${userId}`} className='video-col'>
                  <VideoPlayer
                    metadata={{
                      socketId: this.props.users[userId].socketId,
                      isMuted: this.props.users[userId].muted,
                      disableMute: this.props.users[userId].disableMute
                    }}
                    srcObject={this.props.users[userId].stream}
                    src={this.props.users[userId].streamUrl || (this.props.users[userId].stream ? createObjectUrl(this.props.users[userId].stream) : null)}
                    key={`video-${userId}`}
                    onLoadedMetadata={this.playStream}
                    onMute={event => {
                      event.preventDefault()
                      this.props.onMute(userId)
                    }}
                    disableMute={this.props.users[userId].disableMute}
                    muted={this.props.users[userId].muted}
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
  usersPerRow: PropTypes.number,
  onMute: PropTypes.func
}

VideoContainer.defaultProps = {
  usersPerRow: 3
}

function mapStateToProps (state, ownProps) {
  if (!state.user || !state.user.socket) return { users: {} }
  return {
    users: {
      ...state.peer,
      [state.user.socket.id]: {
        streamUrl: state.user ? state.user.streamUrl : null,
        socketId: state.user.socket.id,
        muted: true,
        disableMute: true
      }
    }
  }
}

export default connect(mapStateToProps, { onMute })(VideoContainer)
