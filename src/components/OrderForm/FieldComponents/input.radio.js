import React, { memo } from 'react'
import ClassNames from 'classnames'
import PropTypes from 'prop-types'
import _map from 'lodash/map'

import RadioButton from '../../../ui/RadioButton'
import { renderString } from '../OrderForm.helpers'

const RadioInput = memo(({
  def: { options }, renderData, value, onChange, disabled,
}) => (
  <div className={ClassNames('hfui-orderform__input', { disabled })}>
    {_map(options, (o, i) => (
      <RadioButton
        key={i} //eslint-disable-line
        label={renderString(o, renderData)}
        value={value === o}
        onChange={() => onChange(o)}
        uppercase
      />
    ))}
  </div>
))

RadioInput.displayName = 'RadioInput'

RadioInput.propTypes = {
  def: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string, PropTypes.bool, PropTypes.array,
  ])).isRequired,
  renderData: PropTypes.shape({
    QUOTE: PropTypes.string.isRequired,
    BASE: PropTypes.string.isRequired,
  }).isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
}

RadioInput.defaultProps = {
  disabled: false,
}

export default RadioInput
