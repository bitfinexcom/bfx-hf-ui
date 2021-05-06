import React from 'react'
import PropTypes from 'prop-types'

const FavoriteIcon = ({
  isSelected, onClick, value, nonFilled, selectedColor, nonSelectedColor,
}) => (
  <svg onClick={() => onClick(value, nonFilled)} width='15px' height='15px' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'>
    {nonFilled ? (
      <path d='M4.99998 8.02696L2.11567 9.54342L2.66665 6.33152L0.333313 4.05707L3.55783 3.58881L4.99998 0.666656L6.44213 3.58881L9.66665 4.05707L7.33331 6.33152L7.88428 9.54342L4.99998 8.02696Z' stroke='white' strokeWidth='0.5' strokeLinecap='round' strokeLinejoin='round' />
    ) : (
      <path d='M5.29892 0.517844C5.24277 0.404065 5.12689 0.332031 5.00001 0.332031C4.87313 0.332031 4.75725 0.404065 4.7011 0.517844L3.33651 3.28284L0.28544 3.7259C0.159871 3.74414 0.0555444 3.83208 0.0163289 3.95276C-0.0228865 4.07343 0.00981075 4.2059 0.100672 4.29447L2.30851 6.4466L1.78717 9.48577C1.76572 9.61083 1.81713 9.73722 1.91978 9.8118C2.02243 9.88638 2.15852 9.89621 2.27083 9.83717L5.00001 8.40227L7.72919 9.83717C7.8415 9.89621 7.97759 9.88638 8.08024 9.8118C8.1829 9.73722 8.2343 9.61083 8.21285 9.48577L7.69151 6.4466L9.89935 4.29447C9.99021 4.2059 10.0229 4.07343 9.98369 3.95276C9.94448 3.83208 9.84015 3.74414 9.71458 3.7259L6.66351 3.28284L5.29892 0.517844Z' fill={isSelected ? selectedColor : nonSelectedColor} />
    )}
  </svg>
)

FavoriteIcon.propTypes = {
  isSelected: PropTypes.bool,
  onClick: PropTypes.func,
  value: PropTypes.string,
  nonFilled: PropTypes.bool,
  selectedColor: PropTypes.string,
  nonSelectedColor: PropTypes.string,
}

FavoriteIcon.defaultProps = {
  isSelected: false,
  onClick: () => {},
  nonFilled: false,
  value: '',
  selectedColor: '#16B157',
  nonSelectedColor: '#F7F7F9',
}

export default FavoriteIcon
