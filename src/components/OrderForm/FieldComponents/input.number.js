import React, { memo } from 'react'
import ClassNames from 'classnames'
import _isFinite from 'lodash/isFinite'
import PropTypes from 'prop-types'
import { Tooltip } from '@ufx-ui/core'

import Input from '../../../ui/Input'
import { renderString, CONVERT_LABELS_TO_PLACEHOLDERS } from '../OrderForm.helpers'

const NumberInput = memo(({
  value, def: { label, customHelp }, disabled, onChange, validationError, percentage, max, renderData,
}) => {
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
        placeholder={CONVERT_LABELS_TO_PLACEHOLDERS ? renderedLabel : undefined}
        percentage={percentage}
        max={max}
      />

      {!CONVERT_LABELS_TO_PLACEHOLDERS && (
        <p className='hfui-orderform__input-label'>
          {renderedLabel}
          {customHelp && (
            <Tooltip className='__react-tooltip __react_component_tooltip' content={customHelp}>
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
})

NumberInput.displayName = 'NumberInput'

NumberInput.DEFAULT_VALUE = ''
NumberInput.processValue = v => +v
NumberInput.validateValue = (v) => {
  return _isFinite(+v) ? null : 'Must be a number'
}

NumberInput.propTypes = {
  def: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string, PropTypes.object, PropTypes.number, PropTypes.bool,
  ])),
  renderData: PropTypes.shape({
    QUOTE: PropTypes.string.isRequired,
    BASE: PropTypes.string.isRequired,
  }),
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  validationError: PropTypes.string,
  disabled: PropTypes.bool,
  percentage: PropTypes.bool,
  max: PropTypes.number,
}

NumberInput.defaultProps = {
  disabled: false,
  validationError: '',
  def: {},
  renderData: {},
  percentage: false,
  max: Number.MAX_SAFE_INTEGER,
}

export default NumberInput
