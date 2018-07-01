import React, { Component } from 'react'
import JoinOrCreateRoom from '../../ui-components/join-or-create-room'
import { Row, Col, Grid, Button, Panel } from 'react-bootstrap'
import Modal from '../../ui-components/modal'
import Emoji from '../../ui-components/emoji'
import { getNextUrl } from '../../utils/window'
import { parseRoomIdFromNextUrl } from '../../utils/room'
import './index.css'
import chromeLogo from '../../assets/img/platform-logos/chrome.svg'
import firefoxLogo from '../../assets/img/platform-logos/firefox.svg'
import androidLogo from '../../assets/img/platform-logos/android.png'

class Welcome extends Component {
  constructor (props) {
    super(props)
    this.toggleFaq = this.toggleFaq.bind(this)
    this.state = {
      showFaq: false
    }
  }

  toggleFaq () {
    this.setState({
      showFaq: !this.state.showFaq
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
              such as Skype or WhatsApp Video. Those who suffer constant connection problems while
              using Google Hangouts or Cisco Webex.
            </p>
            <p>
              This application won't solve all your problems but I hope it will make it your life easier and
              maybe a little bit happier.
            </p>
            <p>
              <b>Feedback</b> <Emoji emoji={'✍️'} label='write' />
                <br />
                If you like it, let me know. If you hate it, let me know. If you want something improved, let me know. Let's aim to improve! Just look out for the smiley face popping out of a corner. 
                <br /><br />
                <small>Note: If you use an adblocker, you may not see the feedback smiley. In that case, feel free to just reach out to me directly via email or social media.</small>
            </p>
            <br />
            <p>
              That's it. Happy chatting!
              <br />
              You can <b>get started</b> by creating or joining a room
            </p>
            <div>
              <Panel className='faq'>
                <Panel.Heading>
                  <Panel.Title toggle>
                    <b>FAQ (Show / Hide)</b>
                  </Panel.Title>
                </Panel.Heading>
                <Panel.Collapse>
                  <Panel.Body>
                  <div className='faq'>
                <Row>
                  <Col md={4}>
                    Works on
                  </Col>
                  <Col md={8}>
                    &nbsp;<embed src={chromeLogo} className='platform-logo' /> Google Chrome v49+<br />
                    &nbsp;<embed src={firefoxLogo} className='platform-logo' /> Firefox v59+<br />
                    &nbsp;<img alt='android' src={androidLogo} className='platform-logo-android' /><embed src={chromeLogo} className='platform-logo platform-logo-chrome-android' /> Chrome for Android v66+<br /> 
                    and more... (yet to be tested)
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col md={4}>
                    How do I use it?
                  </Col>
                  <Col md={8}>
                    1. Create a room<br />
                    2. Share the room with a friend using the link/url <br />
                    3. When your friend joins the room, you'll instantly see them! <br />
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col md={4}>
                    I'm unable to talk to my friends/family outside the USA
                  </Col>
                  <Col md={8}>
                    I'm aware of this service not working well for people outside the USA. Because of the way the technology works, in some cases, your machine is unable to locate / find the origin of the person that you are trying to reach. 
                    This involves a more complex networking setup that I don't have the bandwidth to support at this time, but maybe in the future.
                  </Col>
                </Row>
                <br />
              </div>
                  </Panel.Body>
                </Panel.Collapse>
              </Panel>
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
