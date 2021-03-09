import React from 'react'
import ClassNames from 'classnames'
import PropTypes from 'prop-types'

import { renderString, CONVERT_LABELS_TO_PLACEHOLDERS } from '../OrderForm.helpers'

import Input from '../../../ui/Input'
import Tooltip from '../../../ui/Tooltip'

import NumberInput from './input.number'

export default class PercentInput extends React.PureComponent {
  static propTypes = {
    def: PropTypes.instanceOf(Object).isRequired,
    renderData: PropTypes.instanceOf(Object).isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string,
    validationError: PropTypes.string,
    disabled: PropTypes.bool,
  }
  static defaultProps = {
    disabled: false,
    validationError: '',
    value: '',
  }
  static DEFAULT_VALUE = ''
  static processValue = v => (v / 100.0)
  static validateValue = (v) => {
    const value = v.trim()
    const numericError = NumberInput.validateValue(value)
    if (numericError) {
      return numericError
    }
    if (!value.length) {
      return null
    }

    if (+value <= 0) {
      return 'Must be grater then 0'
    }

    if (+value > 100) {
      return 'Must be less or equal to 100'
    }
    return null
  }

  render() {
    let fixedValue
    const {
      value,
      def = {},
      disabled,
      onChange,
      renderData = {},
      validationError,
    } = this.props
    const { label, customHelp } = def
    const renderedLabel = renderString(label, renderData)
    const [, decimal] = value.split('.')
    if (decimal && decimal.length >= 2) {
      fixedValue = (+value).toFixed(2)
    }
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
          value={fixedValue || value}
          placeholder={CONVERT_LABELS_TO_PLACEHOLDERS ? renderedLabel : undefined}
        />

        {!CONVERT_LABELS_TO_PLACEHOLDERS && (
          <p className='hfui-orderform__input-label'>
              {renderedLabel}
            {customHelp && (
              <Tooltip tooltipContent={customHelp}>
                <i className='fa fa-info-circle' />
              </Tooltip>
            )}
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
