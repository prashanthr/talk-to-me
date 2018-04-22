import React, { Component } from 'react'
import { Icon, Button } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import { map } from 'lodash'

class Toolbar extends Component {
  renderMenuItem = (item) => (
    <Button 
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
          <Button active={false} onClick={e => e.preventDefault()}>
            {this.props.label}
          </Button>
          {map(this.props.items, item => this.renderMenuItem(item))}
        </Button.Group>
      </div>
    )
  }
}

Toolbar.propTypes = {
  label: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.object),
  activeMenuItem: PropTypes.string
}

Toolbar.defaultProps = {
  activeMenuItem: null
}

export default Toolbar
