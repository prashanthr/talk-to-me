import React, { Component } from 'react'
import { Icon, Button } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import { map } from 'lodash'

class Toolbar extends Component {
  renderMenuItem = (item) => (
    <Button
      active={item.active !== false}
      key={item.key}
      onClick={item.onClick}>
      <Icon name={item.icon} />
      {item.label || item.key}
    </Button>
  )
  render() {
    return (
      <div>
        <Button.Group>
          {map(this.props.items, item => this.renderMenuItem(item))}
        </Button.Group>
      </div>
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
