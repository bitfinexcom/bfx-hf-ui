/* eslint-disable react/forbid-prop-types */
import React from 'react'
import PropTypes from 'prop-types'
import { Dropdown as UfxDropdown } from 'ufx-ui'

const propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.object.isRequired,
  options: PropTypes.array.isRequired,
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  componentProps: PropTypes.object,
}

const defaultProps = {
  className: '',
  componentProps: {},
}

function optionsAdaptor(options) {
  return options.reduce((nextOptions, option) => ({
    ...nextOptions,
    [option.value]: option.label,
  }), {})
}

function Select(props) {
  const {
    onChange,
    value,
    options,
    className,
    componentProps,
  } = props

  const nextOptions = optionsAdaptor(options)

  console.log('TCL: Select -> nextOptions', nextOptions)

  return (
    <UfxDropdown
      value={value}
      options={nextOptions}
      className={className}
      onChange={onChange}
      {...componentProps}
    />
  )
}

Select.propTypes = propTypes
Select.defaultProps = defaultProps

export default Select
