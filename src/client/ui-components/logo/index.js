import React from 'react'
import LogoImg from '../../assets/vector/default-monochrome.svg' 
import './index.css'

const Logo = () => (
  <div className='talk-to-me-logo'>
    <a href={'/'}>
      <img src={LogoImg} alt='logo' />
    </a>
  </div>
)

export default Logo
