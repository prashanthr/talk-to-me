import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { createRoom } from '../actions/session'
import { connect } from 'react-redux'

class CreateRoom extends Component {
  render () {
    return (
      <div>
        <input
          id='room-name'
          type='text'
          placeholder='Enter room name'
        />
        <button
          name='Join'
          onClick={(e) => {
            e.preventDefault()
            const room = document.getElementById('room-name').value
            console.log('abc', room)
            this.props.createRoom(room)
          }}
        />
      </div>
    )
  }
}

CreateRoom.propTypes = {
  createRoom: PropTypes.func
}

export default connect((state) => state, { createRoom })(CreateRoom)
