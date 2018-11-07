import React, { Component } from 'react'
import PropTypes from 'prop-types'
import VideoContainer from '../../ui-components/video-container'
import ToolbarWrapper from '../../ui-components/toolbar/toolbar-wrapper'
import Chat from '../../ui-components/chat'
import { Grid, Row, Col } from 'react-bootstrap'
import { bubble as Menu } from 'react-burger-menu'
import { connect } from 'react-redux'
import { initialize, shutdown } from '../../redux/ducks/room'
import { onSendChat } from '../../redux/ducks/chat'
import './index.css'

class Room extends Component {
  componentWillMount () {
    this.props.initialize(this.props.roomId)
    this.onToggleChat = this.onToggleChat.bind(this)
    this.state = {
      showChat: false
    }
  }
  componentWillUnmount () {
    this.shutdown()
  }
  shutdown () {
    this.props.shutdown(this.props.roomId)
  }
  onToggleChat () {
    this.setState({
      showChat: !this.state.showChat
    })
  }
  render () {
    return (
      <div id='room-outer-wrapper'>
        <Menu
          isOpen={this.state.showChat}
          width={'30%'}
          noOverlay
          disableOverlayClick
          right
          pageWrapId='room-inner-wrapper'
          outerContainerId='room-outer-wrapper'
        >  
          <Chat
            messages={this.props.chatMessages} 
            onSendChat={this.props.onSendChat}
          />
        </Menu>
        <main id='room-inner-wrapper'>
          <Grid fluid>
            <Row className='show-grid'>
              <Col md={12} xs={12} className='room-toolbar'>
                <br />
                <ToolbarWrapper
                  onToggleChat={this.onToggleChat}
                  roomId={this.props.roomId}
                  onLeaveRoom={this.props.shutdown}
                />
              </Col>
            </Row>
            <Row>
              <Col md={12} xs={12}>
                {/* {this.props.error
                  ? 'Encountered an error getting streams'
                  : (
                    this.props.user && this.props.user.stream
                    ? <VideoContainer />
                    : 'Initializing streams...'
                  )
                } */}
              </Col>
            </Row>
          </Grid>
        </main>
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
    roomId: ownProps && ownProps.match ? ownProps.match.params.id : null,
    error: state.room.error,
    user: state.user,
    chatMessages: state.chat.messages || []
  }
}

export default connect(mapStateToProps, { initialize, shutdown, onSendChat })(Room)
