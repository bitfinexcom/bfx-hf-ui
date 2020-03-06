import React from 'react'
import ClassNames from 'classnames'
import _isFinite from 'lodash/isFinite'

import Input from '../../../ui/Input'
import { propTypes, defaultProps } from './input.number.props'
import {
  renderString, CONVERT_LABELS_TO_PLACEHOLDERS,
} from '../OrderForm.render.helpers'

export default class NumberInput extends React.PureComponent {
  static processValue = v => +v
  static validateValue = (v) => {
    return _isFinite(+v)
      ? null
      : 'Must be a number'
  }

  static propTypes = propTypes
  static defaultProps = defaultProps

  static DEFAULT_VALUE = ''

  render() {
    const {
      def = {}, renderData = {}, value, disabled, onChange, validationError,
    } = this.props

    const { label } = def
    const renderedLabel = renderString(label, renderData)

    return (
      <div className={ClassNames('hfui-orderform__input', {
        disabled,
        invalid: !!validationError,
      })}
      >
        <Input
          type='text'
          onChange={onChange}
          disabled={disabled}
          value={value}
          placeholder={CONVERT_LABELS_TO_PLACEHOLDERS && renderedLabel}
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
