import React, { memo } from 'react'
import ClassNames from 'classnames'
import PropTypes from 'prop-types'

import './style.css'

const NavbarButton = ({
  currentRoute, route, navigate, label, external, onClick,
}) => {
  if (external) {
    return (
      <a
        href={`${external}`}
        target='_blank'
        rel='noopener noreferrer'
      >
        {label}
      </a>
    )
  }

  return (
    <button
      type='button'
      className={ClassNames('hfui-navbarbutton', { active: currentRoute === route })}
      onClick={onClick || (route === currentRoute ? () => { } : () => navigate(route))}
    >
      {label}
    </button>
  )
}

NavbarButton.propTypes = {
  currentRoute: PropTypes.string.isRequired,
  route: PropTypes.string,
  navigate: PropTypes.func.isRequired,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.element]).isRequired,
  onClick: PropTypes.func,
  external: PropTypes.string,
}

NavbarButton.defaultProps = {
  onClick: null,
  external: '',
  route: '',
}

export default memo(NavbarButton)
