import React, { Component } from 'react'
import { Icon, Menu } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import { map } from 'lodash'

class Toolbar extends Component {
  renderMenuItem = (item) => (
    <Menu.Item
      key={item.key}
      name={item.name || item.key}
      active={this.props.activeMenuItem === item.key}
      onClick={item.onClick}
    >
      <Icon name={item.icon} />
      {item.label || item.key}
    </Menu.Item>
  )
  render() {
    return (
      <Menu compact icon='labeled'>
        {map(this.props.items, item => this.renderMenuItem(item))}
      </Menu>
    )
  }
}

Toolbar.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  activeMenuItem: PropTypes.string
}

Toolbar.defaultProps = {
  activeMenuItem: null
}

export default Toolbar
