import React from 'react'
import ClassNames from 'classnames'
import _isFinite from 'lodash/isFinite'

import Input from '../../../ui/Input'
import { propTypes, defaultProps } from './input.number.props'
import {
  renderString, CONVERT_LABELS_TO_PLACEHOLDERS,
} from '../OrderForm.render.helpers'

export default class SliderInput extends React.PureComponent {
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

    const { label, min, max } = def
    const renderedLabel = renderString(`${label} $_VALUE`, {
      ...renderData,
      _VALUE: `(${value})`,
    })

    return (
      <div className={ClassNames('hfui-orderform__input', {
        disabled,
        invalid: !!validationError,
      })}
      >
        <Input
          type='range'
          onChange={onChange}
          disabled={disabled}
          value={value}
          min={min}
          max={max}
        />

        {!CONVERT_LABELS_TO_PLACEHOLDERS && (
          <p className='hfui-orderform__input-label'>
            {renderedLabel}
          </p>
        )}

        {validationError && (
          <p className='hfui-orderform__input-error-label'>
            {validationError}
          </p>
        )}
      </div>
    )
  }
}
