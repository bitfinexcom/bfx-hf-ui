import React from 'react'
import ClassNames from 'classnames'
import _isFinite from 'lodash/isFinite'

import Input from '../../../ui/Input'
import { renderString } from '../OrderForm.helpers'
import { propTypes, defaultProps } from './input.number.props'

export default class NumberInput extends React.PureComponent {
  static propTypes = propTypes
  static defaultProps = defaultProps
  static DEFAULT_VALUE = ''
  static processValue = v => +v
  static validateValue = (v) => {
    return _isFinite(+v)
      ? null
      : 'Must be a number'
  }

  render() {
    const {
      def = {}, renderData = {}, value, disabled, onChange, validationError,
    } = this.props

    const { label } = def

    return (
      <div className={ClassNames('dtc-orderform__input', {
        disabled,
        invalid: !!validationError,
      })}
      >
        <Input
          type='text'
          onChange={onChange}
          disabled={disabled}
          value={value}
        />

        <p className='dtc-orderform__input-label'>
          {renderString(label, renderData)}
        </p>

        {validationError && (
          <p className='dtc-orderform__input-error-label'>
            {validationError}
          </p>
        )}
      </div>
    )
  }
}
