import React from 'react'
import config from '../../config'
import './index.css'

const APP_VERSION = process.env.APP_VERSION
const FEEDBACK_URL = config.contactUrl
const BUG_URL = config.bugUrl

const Footer = () => (
  <footer className='footer'>
    Copyright © PR {`${new Date().getFullYear()}. `} 
    {`${APP_VERSION ? `v${APP_VERSION}. ` : ''}`}
    Made with 💛
    <br />
    <a href={FEEDBACK_URL}>Feedback/Contact. </a>
    <a href={BUG_URL}>Report an issue</a>
  </footer>
)

Footer.propTypes = {}

export default Footer
