import React, { memo } from 'react'
import ClassNames from 'classnames'
import _isFinite from 'lodash/isFinite'
import PropTypes from 'prop-types'

import Input from '../../../ui/Input'
import { renderString, CONVERT_LABELS_TO_PLACEHOLDERS } from '../OrderForm.helpers'

const SliderInput = memo(({
  def: { label, min, max }, renderData, value, disabled, onChange, validationError,
}) => {
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
})

SliderInput.DEFAULT_VALUE = ''

SliderInput.processValue = v => +v

SliderInput.validateValue = (v) => {
  return _isFinite(+v) ? null : 'Must be a number'
}

SliderInput.displayName = 'SliderInput'

SliderInput.propTypes = {
  def: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
      PropTypes.number,
    ]),
  ),
  renderData: PropTypes.objectOf(PropTypes.string),
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  validationError: PropTypes.string,
  disabled: PropTypes.bool,
}

SliderInput.defaultProps = {
  disabled: false,
  validationError: '',
  def: {},
  renderData: {},
}

export default SliderInput
