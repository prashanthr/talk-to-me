import React, { Component } from 'react'
import PropTypes from 'prop-types'
import VideoContainer from '../../ui-components/video-container'
import ToolbarWrapper from '../../ui-components/toolbar/toolbar-wrapper'
import { Grid, Row, Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import { initialize, shutdown } from '../../redux/ducks/room'
import { onToggleChat } from '../../redux/ducks/chat'
import { keys } from 'lodash'
import ChatMenu from './chat-menu'
import Head from '../../ui-components/head'
import WaitingForOthers from './waiting-for-others'
import './index.css'

const errorCopy = 'Encountered an error getting streams. Are you using a supported browser (ex: Google Chrome)? Please clear your cookies and cache for this site and try again.'
class Room extends Component {
  componentWillMount () {
    this.props.initialize(this.props.roomId)
  }
  componentWillUnmount () {
    this.shutdown()
  }
  shutdown () {
    this.props.shutdown(this.props.roomId)
  }
  render () {
    return (
      <div id='room-outer-wrapper'>
        <Head 
          title={`Room - ${this.props.roomId} [${this.props.numPeers + 1}]`}
          appendSiteNamePrefix
        />
        <ChatMenu />
        <Grid fluid>
          <Row className='show-grid'>
            <Col md={12} xs={12} className='room-toolbar'>
              <br />
              <ToolbarWrapper
                roomId={this.props.roomId}
                onLeaveRoom={this.props.shutdown}
              />
            </Col>
          </Row>
          {this.props.numPeers === 0 && (
            <Row>
              <Col md={12} xs={12}>
                <WaitingForOthers />
                <br />
              </Col>
            </Row>
          )}
          <Row>
            <Col md={12} xs={12}>
              {this.props.error
                ? (errorCopy)
                : (
                  this.props.user && this.props.user.stream
                  ? <VideoContainer />
                  : 'Initializing streams...'
                )
              }
            </Col>
          </Row>
        </Grid>
        <main id='room-inner-wrapper' />
      </div>  
    )
  }
}

Room.propTypes = {
  roomId: PropTypes.string,
  user: PropTypes.object,
  error: PropTypes.any,
  initialize: PropTypes.func,
  shutdown: PropTypes.func,
  onSendChat: PropTypes.func
}

function mapStateToProps (state, ownProps) {
  return {
    numPeers: keys(state.peer).length || 0,
    roomId: ownProps && ownProps.match ? ownProps.match.params.id : null,
    error: state.room.error,
    user: state.user,
    chatLabel: state.chat.showChat ? 'Hide Chat' : 'Show Chat'
  }
}

export default connect(mapStateToProps, { initialize, shutdown, onToggleChat })(Room)
