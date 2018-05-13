import React from 'react'
import PropTypes from 'prop-types'
import { FormGroup, FormControl } from 'react-bootstrap'
import { map } from 'lodash'

const DropdownMenu = ({ items, selectedKey, onChange }) => (
  <FormGroup>
    <FormControl
      componentClass='select'
      placeholder='Select source'
      selected={selectedKey}
      onChange={onChange}
    >
      {
        map(items, item => (
          <option
            key={item.key}
            value={item.key}
          >
            {item.label}
          </option>
        ))
      }
    </FormControl>
  </FormGroup>
)

DropdownMenu.propTypes = {
  items: PropTypes.array,
  selectedKey: PropTypes.string,
  onChange: PropTypes.func
}

export default DropdownMenu
