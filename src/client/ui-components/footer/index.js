import React from 'react'

const APP_VERSION = process.env.APP_VERSION

const Footer = () => (
  <footer className='footer'>
    Copyright © PR. {`${new Date().getFullYear()}`}
    {`${APP_VERSION ? `. v${APP_VERSION}` : ''}`}
  </footer>
)

Footer.propTypes = {}

export default Footer
