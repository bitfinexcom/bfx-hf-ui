import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

export default function NavbarButton({
  icon, alt, className, ...props
}) {
  const Icon = icon
  return (
    <button type='button' className={cx('hfui-exchangeinfobar__button', className)} {...props}>
      {typeof icon === 'string' ? (
        <i className={`icon-${icon}`} />
      ) : (
        <Icon />
      )}
    </button>
  )
}

NavbarButton.propTypes = {
  icon: PropTypes.string.isRequired,
  alt: PropTypes.string,
  className: PropTypes.string,
}

NavbarButton.defaultProps = {
  alt: '',
  className: '',
}
