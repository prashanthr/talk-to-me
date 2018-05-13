import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Emoji from '../emoji'
import TextCopyBox from '../text-copy-box'
import './index.css'

class ShareRoom extends Component {
  constructor (props) {
    super(props)
    this.onCopyRoom = this.onCopyRoom.bind(this)
    this.state = {
      copied: false,
      message: null
    }
  }

  onCopyRoom () {
    const el = document.getElementById(this.props.url)
    if (el) {
      el.select()
      document.execCommand('Copy')
      this.setState({
        copied: true,
        message: (<span>Successfully copied share-able link to your clipboard! <Emoji emoji='🙌🏽' label='wohoo' /></span>)
      })
    } else {
      this.setState({
        copied: false,
        message: `Oops! Failed to auto copy to your clipboard. Please manually copy the url`
      })
    }
  }
  render () {
    return (
      <div className='regular'>
        <p>
          Here's the link to your room. Feel free to share it with anyone!
        </p>
        <TextCopyBox
          text={this.props.url}
          onCopy={this.onCopyRoom}
        />
        <p className='success'>{this.state.message}</p>
        <div>
          A few things to note <br />
          <ol>
            <li>As of now rooms are public - which means anyone can join via url and access code</li>
            <li>The only way to secure your room is to create a random/unique url that is hard to guess. </li>
            <li>In the future, you will be able to create private / locked rooms.</li>
          </ol>
        </div>
      </div>
    )
  }
}

ShareRoom.propTypes = {
  url: PropTypes.string
}

export default ShareRoom
