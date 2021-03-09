import React from 'react'
import ClassNames from 'classnames'
import _isFinite from 'lodash/isFinite'
import PropTypes from 'prop-types'

import Input from '../../../ui/Input'

import {
  renderString, CONVERT_LABELS_TO_PLACEHOLDERS,
} from '../OrderForm.helpers'

export default class SliderInput extends React.PureComponent {
  static propTypes = {
    def: PropTypes.instanceOf(Object).isRequired,
    renderData: PropTypes.instanceOf(Object).isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    validationError: PropTypes.string,
    disabled: PropTypes.bool,
  }

  static defaultProps = {
    disabled: false,
    validationError: '',
  }
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
