import React from 'react'
import PropTypes from 'prop-types'

import NumberInput from './input.number'

const PercentInput = ({ layout, ...props }) => {
  const { id } = layout

  return (
    <NumberInput
      {...props}
      layout={layout}
      max={id === 'bfx-iceberg' ? 100 : undefined}
      percentage
    />
  )
}

PercentInput.propTypes = {
  layout: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.object,
  ])).isRequired,
}

export default React.memo(PercentInput)
