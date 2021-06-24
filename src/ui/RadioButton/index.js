import React, { memo } from 'react'
import PropTypes from 'prop-types'

import './style.css'

const RadioButton = ({
  onChange, value, label, id, uppercase,
}) => (
  <div className='pretty p-default p-round hfui-radio-button'>
    <input
      className='hfui-input'
      type='radio'
      id={id}
      checked={value}
      onChange={onChange}
    />

    <div className='state'>
      <label
        htmlFor={id}
        style={{
          textTransform: uppercase ? 'uppercase' : 'auto',
        }}
      >
        {label}
      </label>
    </div>
  </div>
)

RadioButton.propTypes = {
  id: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.bool,
  uppercase: PropTypes.bool,
  label: PropTypes.string,
}

RadioButton.defaultProps = {
  id: '',
  uppercase: false,
  onChange: () => { },
  value: '',
  label: '',
}

export default memo(RadioButton)
