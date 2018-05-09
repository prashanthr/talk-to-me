import React from 'react'
import PropTypes from 'prop-types'
import './index.css'

const ToggleButton = ({ enabled, onChange }) => (
  <label className='switch'>
    <input type='checkbox' onChange={onChange} checked={enabled} />
    <span className='slider round' />
  </label>
)

ToggleButton.propTypes = {
  enabled: PropTypes.bool,
  onChange: PropTypes.func
}

export default ToggleButton
