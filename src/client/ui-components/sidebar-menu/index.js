import React from 'react'
import { reveal as Menu } from 'react-burger-menu'
import './index.css'

const SidebarMenu = ({ isOpen, width, noOverlay, disableOverlayClick, right, pageWrapId, outerContainerId, customBurgerIcon, children, onStateChange }) => (
  <Menu
    isOpen={isOpen}
    width={width}
    noOverlay
    disableOverlayClick
    right
    pageWrapId={pageWrapId}
    outerContainerId={outerContainerId}
    customBurgerIcon={customBurgerIcon}
    onStateChange={onStateChange}
  >  
    {children}
  </Menu>
)

export default SidebarMenu
