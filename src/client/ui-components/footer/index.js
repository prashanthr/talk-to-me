import React from 'react'
import config from '../../config'
import './index.css'

const APP_VERSION = process.env.APP_VERSION

const Footer = () => (
  <div className='footer-div'>
    Copyright © PR {`${new Date().getFullYear()}. `} 
    {`${APP_VERSION ? `v${APP_VERSION}. ` : ''}`}
    Made with 💛
    <br />
    <a href={config.contactUrl}>Feedback/Contact. </a>
    <a href={config.bugUrl}>Report an issue</a>
  </div>
)

Footer.propTypes = {}

export default Footer
