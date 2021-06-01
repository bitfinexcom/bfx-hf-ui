import React, { memo } from 'react'
import _divide from 'lodash/divide'
import PropTypes from 'prop-types'
import _isFinite from 'lodash/isFinite'

import NumberInput from './input.number'

const PercentInput = memo(({ layout, ...props }) => (
  <NumberInput {...props} max={100} percentage />
))

PercentInput.displayName = 'PercentInput'

PercentInput.processValue = v => _divide(v, 100)

PercentInput.validateValue = (v) => {
  return _isFinite(+v) ? null : 'Must be a number'
}

PercentInput.DEFAULT_VALUE = ''

PercentInput.propTypes = {
  layout: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.object,
  ])).isRequired,
}

export default PercentInput
