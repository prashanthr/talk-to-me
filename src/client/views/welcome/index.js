import React, { Component } from 'react'
import JoinOrCreateRoom from '../../ui-components/join-or-create-room'
import { Row, Col, Grid, Jumbotron } from 'react-bootstrap'
import Emoji from '../../ui-components/emoji'
import { getNextUrl } from '../../utils/window'
import { parseRoomIdFromNextUrl } from '../../utils/room'
import './index.css'

class Welcome extends Component {
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
                to provide an easy means of communication (audio and video) for the unhappy.
                Yes. I'm referring to you. I'm referring to those who can't use VoIP applications
                such as Skype or WhatsApp Video. Those who suffer constant connection problems while
                using hangouts or webex.
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
                  <li> You don't talk about it. (Just like Fight Club) <Emoji emoji={'🤐'} label='no-speak' />
                    <br />- The moment something good exists out there, evil corporations want to shut it down. So please keep the chatter to a minimum. The less people know about it, the better. But if you know people that you trust who are cool, then feel free to share your invite code with them.
                  </li>
                  <li> Feedback. <Emoji emoji={'✍️'} label='write' />
                  <br />- If you like it, let me know. If you hate it, let me know. If you want something improved, let me know. Let's aim to improve
                  </li>
                </ol>
              </div>
              <br />
              <p>
                That's it. Happy chatting!
                <br />
                Get started by creating or joining a room on the right ↗️
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
