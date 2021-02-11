import React from 'react'
import PropTypes from 'prop-types'
import ClassNames from 'classnames'

import './style.css'

const Button = ({
  red,
  blue,
  gray,
  label,
  green,
  onClick,
  disabled,
  className,
  showSpinner,
}) => (
  <button
    type='button'
    onClick={disabled ? () => {} : onClick}
    className={ClassNames('hfui-button', className, {
      red,
      blue,
      gray,
      green,
      disabled,
    })}
  >
    {disabled && showSpinner
      ? <i className='fa fa-circle-o-notch fa-spin' />
      : label}
  </button>
)

Button.propTypes = {
  red: PropTypes.bool,
  green: PropTypes.bool,
  blue: PropTypes.bool,
  gray: PropTypes.bool,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  showSpinner: PropTypes.bool,
  className: PropTypes.string,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
}

Button.defaultProps = {
  label: null,
  red: false,
  gray: false,
  blue: false,
  green: false,
  className: '',
  disabled: false,
  showSpinner: false,
  onClick: () => {},
}

export default React.memo(Button)
