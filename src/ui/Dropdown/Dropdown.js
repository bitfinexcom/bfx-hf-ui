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
  isOpen: PropTypes.bool,
  icon: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  highlight: PropTypes.bool,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
}
Dropdown.defaultProps = {
  value: '',
  icon: null,
  label: null,
  isOpen: false,
  className: '',
  disabled: false,
  highlight: false,
  placeholder: 'Select an option',
}

export default Dropdown
