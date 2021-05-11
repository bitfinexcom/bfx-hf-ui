/* eslint-disable react/prop-types */
import React from 'react'
import cx from 'classnames'

import { Dropdown as UfxDropdown } from '@ufx-ui/core'
// import { propTypes, defaultProps } from './Dropdown.props'
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
    alternateTheme,
    ...rest
  } = props
  console.log('TCL: Dropdown -> alternateTheme', alternateTheme)

  return (
    <div className='hfui-dropdown__wrapper'>
      {label && (
        <p>{label}</p>
      )}

      <UfxDropdown
        closeOnMouseLeave={false}
        value={value}
        options={optionsAdaptor(options)}
        className={cx(className, {
          'is-highlighted': highlight,
          'is-alternate-theme': alternateTheme,
        })}
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

export default Dropdown
