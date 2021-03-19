import React from 'react'
import Emoji from '../emoji'
import config from '../../config'
import { showErrorDialog } from '../../third-party/sentry'
import './index.css'

const APP_VERSION = process.env.APP_VERSION

const FooterLink = ({ href, text, target = '_blank'}) => (
  <a href={href} target={target}>
    {text}
  </a>
)

const FooterBtn = ({ onClick, text }) => (
  <button 
    className='talktome-btn-link' 
    role='link' 
    onClick={onClick}
  >
    {text}
  </button>
)

const Footer = () => (
  <div className='footer-div'>
    <br /><br /><br />
    <span>
      Copyright © PR {`${new Date().getFullYear()}. `} 
      {`${APP_VERSION ? `v${APP_VERSION}. ` : ''}`}
      Made with 💛
    </span>
    <br />
    Liked it?&nbsp;
    <FooterLink
      href={config.coffeeUrl}
      text={(
        <span>
          Buy me a coffee&nbsp;
          <Emoji emoji={'☕'} label='coffee' />
        </span>
      )}
    />
    <br />
    <FooterLink
      href={config.contactUrl}
      text={'Feedback/Contact'}
    />. &nbsp;
    <FooterBtn
      onClick={() => showErrorDialog()}
      text={'Report an issue'}
    />
  </div>
)

Footer.propTypes = {}

export default Footer
