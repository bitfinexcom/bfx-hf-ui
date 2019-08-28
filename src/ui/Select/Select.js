import React from 'react'
import ClassNames from 'classnames'
import RSelect from 'react-select'

import { propTypes, defaultProps } from './Select.props'
import './style.css'

export default class Select extends React.PureComponent {
  static propTypes = propTypes

  static defaultProps = defaultProps

  render() {
    const {
      onChange, value, options, className, disabled, isDisabled, ...otherProps
    } = this.props

    return (
      <RSelect
        className={ClassNames('dtc-select', className)}
        isDisabled={disabled || isDisabled}
        classNamePrefix='dtc-select'
        onChange={onChange}
        value={value}
        options={options}
        {...otherProps}
      />
    )
  }
}
