import React, { Component } from 'react'
import { Button, ButtonGroup, Glyphicon } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { map } from 'lodash'
import './index.css'

class Toolbar extends Component {
  renderMenuItem = (item) => (
    <Button
      active={item.active !== false}
      key={item.key}
      onClick={item.onClick}>
      {item.icon && <Glyphicon glyph={item.icon} className='toolbar-icon' />}
      {item.label || item.key}
    </Button>
  )
  render() {
    return (
      <div>
        <ButtonGroup size='large'>
          {map(this.props.items, item => this.renderMenuItem(item))}
        </ButtonGroup>
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
