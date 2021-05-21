import React, { memo } from 'react'
import PropTypes from 'prop-types'
import _isFinite from 'lodash/isFinite'

import NumberInput from './input.number'

const PercentInput = memo(({ layout, ...props }) => {
  const { id } = layout

  return (
    <NumberInput
      {...props}
      layout={layout}
      max={id === 'bfx-iceberg' ? 100 : undefined}
      percentage
    />
  )
})

PercentInput.displayName = 'PercentInput'

PercentInput.processValue = v => +v

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
