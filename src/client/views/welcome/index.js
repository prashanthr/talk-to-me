import React, { Component } from 'react'
import JoinOrCreateRoom from '../../ui-components/join-or-create-room'
import { Row, Col, Grid, Jumbotron } from 'react-bootstrap'

class Welcome extends Component {
  componentWillMount () {
    console.log('cwm', this.props.isAuthValid)
  }
  render () {
    return (
      <Grid fluid>
        <Jumbotron>
          <Row>
            <Col md={12}>
              <h1>Hello internet-loving-friend!</h1>
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
              
              <ol>
                <li> You don't talk about it. (Just like Fight Club)
                  <br />- The moment something good exists out there, evil corporations want to shut it down. So please keep the chatter to a minimum. The less people know about it, the better. But if you know people that you trust who are cool, then feel free to share your invite code with them.
                </li>
                <li> Feedback.
                 <br />- If you like it, let me know. If you hate it, let me know. If you want something improved, let me know. Let's aim to improve
                </li>
              </ol>
              
              That's it. Happy chatting!
              
              </p>
            </Col>
          </Row>
          <br />
          <Row>
            <Col md={12}>
              <JoinOrCreateRoom />
            </Col>
          </Row>
        </Jumbotron>
      </Grid>
    )
  }
}

export default Welcome
