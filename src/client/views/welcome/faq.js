import React from 'react'
import { Row, Col } from 'react-bootstrap'
import chromeLogo from '../../assets/img/platform-logos/chrome.svg'
import firefoxLogo from '../../assets/img/platform-logos/firefox.svg'
import androidLogo from '../../assets/img/platform-logos/android.png'

const FAQ = () => (
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
        I'm unable to chat/connect with some people
      </Col>
      <Col md={8}>
        Because of the way the technology works, in some cases, your machine is unable to locate / find the origin of the person that you are trying to reach. 
        This involves a more complex networking setup that I don't have the bandwidth to support at this time, but maybe in the future. 
        If it helps, trying getting off wi-fi and switching to data/cellular and re-establish connection.
      </Col>
    </Row>
    <br />
  </div>
)

export default FAQ
