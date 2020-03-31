import React from 'react'
import Emoji from '../emoji'
import config from '../../config'
import './index.css'

const APP_VERSION = process.env.APP_VERSION

const FooterLink = ({ href, text, target = '_blank'}) => (
  <a href={href} target={target}>
    {text}
  </a>
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
    Liked it? Buy me a &nbsp;
    <FooterLink
      href={config.coffeeUrl}
      text={(
        <span>
          <Emoji emoji={'☕'} label='coffee' />
          {'or '}
          <Emoji emoji='🍩' label='donut' />
        </span>
      )}
    />
    <br />
    <FooterLink
      href={config.contactUrl}
      text={'Feedback/Contact'}
    />. &nbsp;
    <FooterLink
      href={config.bugUrl}
      text={'Report an issue'}
    />
  </div>
)

Footer.propTypes = {}

export default Footer
