import React from 'react'
import PropTypes from 'prop-types'

const Emoji = ({ emoji, label }) => (
  <span
    role='img'
    aria-label={label}
  >
    {emoji}
  </span>
)

Emoji.propTypes = {
  emoji: PropTypes.any,
  label: PropTypes.string
}

export default Emoji
