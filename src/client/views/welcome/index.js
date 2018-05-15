import React, { Component } from 'react'
import JoinOrCreateRoom from '../../ui-components/join-or-create-room'
import { Row, Col, Grid, Jumbotron, Button } from 'react-bootstrap'
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
      <Grid fluid>
        <Jumbotron className='welcome'>
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
                There are a few rules though.
              </p>
              <div>
                <ol>
                  <li> <b>You don't talk about it </b> (Just like Fight Club) <Emoji emoji={'🤐'} label='no-speak' />
                    <br />
                    - I'm kidding. Well - just be mindful of whom you share this info with. The moment something good exists out there, evil corporations want to shut it down. So only share your invite code with people you trust.
                    <br />
                    - P.S. I'm working on more features to provide more access control and privacy. Stay tuned!
                  </li>
                  <li> <b>Feedback</b> <Emoji emoji={'✍️'} label='write' />
                    <br />
                    - If you like it, let me know. If you hate it, let me know. If you want something improved, let me know. Let's aim to improve! Just look out for the smiley face popping out of a corner.
                  </li>
                </ol>
              </div>
              <br />
              <p>
                That's it. Happy chatting!
                <br />
                You can <b>get started</b> by creating or joining a room
              </p>
              <p>
                Check out the
                <Button
                  bsSize='large'
                  bsStyle='link'
                  onClick={this.toggleFaq}
                >
                  FAQ
                </Button>
                <Modal
                  header='FAQ'
                  show={this.state.showFaq}
                  onClose={this.toggleFaq}
                  content={(
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
                    </div>
                  )}
                />
              </p>
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
        </Jumbotron>
      </Grid>
    )
  }
}

export default Welcome
