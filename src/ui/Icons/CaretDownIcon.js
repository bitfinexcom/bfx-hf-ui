import React, { memo } from 'react'
import PropTypes from 'prop-types'

const CaretDownIcon = ({ x, y, ...props }) => (
  <path
    {...props}
    d='M16 7c0-.55-.45-1-1-1H5c-.55 0-1 .45-1 1 0 .24.1.46.24.63l-.01.01 5 6 .01-.01c.19.22.45.37.76.37s.57-.15.76-.37l.01.01 5-6-.01-.01c.14-.17.24-.39.24-.63z'
    transform={`translate(${x}, ${y})`}
    fillRule='evenodd'
  />
)

CaretDownIcon.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
}

export default memo(CaretDownIcon)
