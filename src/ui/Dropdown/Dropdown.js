/* eslint-disable react/prop-types */
import React from 'react'
import PropTypes from 'prop-types'

import { Dropdown as UfxDropdown } from '@ufx-ui/core'
import './style.css'

function optionsAdaptor(options) {
  return options.reduce((nextOptions, option) => ({
    ...nextOptions,
    [option.value]: option.label,
  }), {})
}

function Dropdown(props) {
  const {
    label,
    value,
    placeholder,
    options,
    highlight,
    isOpen,
    icon,
    className,
    ...rest
  } = props

  return (
    <div className='hfui-dropdown__wrapper'>
      {label && (
        <p>{label}</p>
      )}

      <UfxDropdown
        closeOnMouseLeave={false}
        value={value}
        options={optionsAdaptor(options)}
        className={className}
        valueRenderer={icon ? (_value, optionLabel) => (
          <div className='selected-text has-icon'>
            {icon && <i className={`icon-${icon}`} />}
            <div>
              {optionLabel || placeholder}
            </div>
          </div>
        ) : undefined}
        placeholder={placeholder}
        {...rest}
      />
    </div>
  )
}

Dropdown.propTypes = {
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string,
  value: PropTypes.string,
  options: PropTypes.array.isRequired,
  highlight: PropTypes.bool,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  isOpen: PropTypes.bool,
}
Dropdown.defaultProps = {
  value: '',
  placeholder: 'Select an option',
}

export default Dropdown
