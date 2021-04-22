import React, { memo } from 'react'
import PropTypes from 'prop-types'
import ClassNames from 'classnames'

import './style.css'

const Textarea = ({
  className, onChange, disabled, value, placeholder, label, style, maxLength,
}) => (
  <div className={ClassNames('hfui-textarea', className)}>
    {label && (
      <p>{label}</p>
    )}

    <textarea
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      disabled={disabled}
      style={style}
      value={value}
      maxLength={maxLength}
    />
  </div>
)

Textarea.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  style: PropTypes.objectOf([PropTypes.string, PropTypes.number]),
  maxLength: PropTypes.number,
}

Textarea.defaultProps = {
  onChange: () => { },
  placeholder: '',
  className: '',
  disabled: false,
  value: '',
  style: null,
  label: '',
  maxLength: 5000,
}

export default memo(Textarea)
