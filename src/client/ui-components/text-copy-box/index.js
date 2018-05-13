import React from 'react'
import PropTypes from 'prop-types'
import { Form, FormControl, FormGroup, Button } from 'react-bootstrap'

const TextCopyBox = ({ text, onCopy }) => (
  <div>
    <Form inline>
      <FormGroup controlId={text}>
        <FormControl
          id={text}
          type='text'
          size={text.length}
          value={text}
          readOnly
        />
      </FormGroup>{' '}
      <Button onClick={onCopy}>
        Copy
      </Button>
    </Form>
  </div>
)

TextCopyBox.propTypes = {
  text: PropTypes.string,
  onCopy: PropTypes.func
}

export default TextCopyBox
