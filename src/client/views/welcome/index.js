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
          <Col md={7}>
            <h2>Hello internet-loving-friend! <Emoji emoji={'🙌🏽'} label='wohoo' /></h2>
            <p>
              Welcome to Talk to Me. I built this application using the latest technologies,
              to provide an easy means of group communication for the unhappy.
              Yes. I'm referring to you. I'm referring to those who can't use VoIP applications
              such as Skype. Those who suffer constant connection problems while
              using Google Hangouts or Cisco Webex.
            </p>
            <p>
              This application won't solve all your problems but I hope it will make it your life easier and
              maybe a little bit happier.
            </p>
            <p>
              <b>Feedback</b> <Emoji emoji={'✍️'} label='write' />
                <br />
                If you like it, let me know. If you hate it, let me know. If you want something improved, let me know. Let's aim to improve! Just look out for the feedback link on the footer of the page. 
                <br />
                Thanks for checking this out! You are pretty cool 😎
            </p>
            <br />
            <p>
              That's it. Happy chatting!
              <br />
              You can <b>get started</b> by creating or joining a room
            </p>
            <div>
              Read the <a className='faq-link' onClick={this.toggleFaq}>FAQ</a>
              <Modal
                show={this.state.showFaqModal}
                content={<FAQ />}
                header={'FAQ'}
                onClose={this.toggleFaq}
              />
            </div>
          </Col>
          <br />
          <Col md={5}>
            <div className='join-or-create-room'>
              <JoinOrCreateRoom
                roomId={roomId}
              />
            </div>
          </Col>
        </Row>
      </Grid>
    )
  }
}

export default Welcome
