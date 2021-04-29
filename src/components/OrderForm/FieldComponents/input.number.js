import React from 'react'
import ClassNames from 'classnames'
import _isFinite from 'lodash/isFinite'
import PropTypes from 'prop-types'

import Input from '../../../ui/Input'
import Tooltip from '../../../ui/Tooltip'
import { renderString, CONVERT_LABELS_TO_PLACEHOLDERS } from '../OrderForm.helpers'

class NumberInput extends React.PureComponent {
  static DEFAULT_VALUE = ''
  static processValue = v => +v
  static validateValue = (v) => {
    return _isFinite(+v)
      ? null
      : 'Must be a number'
  }

  render() {
    const {
      value,
      def,
      disabled,
      onChange,
      renderData,
      validationError,
      percentage,
      max,
    } = this.props
    const { label, customHelp } = def
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

NumberInput.propTypes = {
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
