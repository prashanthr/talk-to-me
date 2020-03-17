import React, { Component } from 'react'
import JoinOrCreateRoom from '../../ui-components/join-or-create-room'
import { Row, Col, Grid } from 'react-bootstrap'
import Modal from '../../ui-components/modal'
import Emoji from '../../ui-components/emoji'
import { getNextUrl } from '../../utils/window'
import { parseRoomIdFromNextUrl } from '../../utils/room'
import FAQ from './faq'
import './index.css'

class Welcome extends Component {
  constructor (props) {
    super(props)
    this.toggleFaq = this.toggleFaq.bind(this)
    this.state = {
      showFaqModal: false
    }
  }

  toggleFaq () {
    this.setState({
      showFaqModal: !this.state.showFaqModal
    })
  }
  render () {
    const next = getNextUrl()
    const roomId = parseRoomIdFromNextUrl(next)
    return (
      <Grid fluid className='welcome'>
        <Row>
          <Col md={2} />
          <Col md={8}>
            <h2>Hello friend! <Emoji emoji={'👋'} label='wave' /></h2>
            <div>
              <p>
              Welcome to Talk to Me. I built this application using the latest technologies,
              to provide an easy way to talk (audio/video/text) to your friends or loved ones without having to install or download an app or use an existing buggy piece of software. 
              <br /><br />
              Join or create a room, share the link and you're good to go! 
              <br />
              That's it. Happy chatting!
              </p>
            </div>
            <div className='join-or-create-room'>
              <JoinOrCreateRoom
                roomId={roomId}
              />
            </div>
            <br /><br />
            <div>
              <b>Questions?</b> Read the <a className='faq-link' onClick={this.toggleFaq}>FAQ</a>
              <Modal
                show={this.state.showFaqModal}
                content={<FAQ />}
                header={'FAQ'}
                onClose={this.toggleFaq}
              />
            </div>
            <p>
              Thanks for checking this out! You're awesome <Emoji emoji={'😎'} label='awesome' />
              <br />
              Feel free to leave some feedback by using the page footer links, if you'd like.
            </p>
            <br />
          </Col>
          <Col md={2} />
        </Row>
      </Grid>
    )
  }
}

export default Welcome
