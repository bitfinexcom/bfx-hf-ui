import React, { memo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { push } from 'connected-react-router'
import ClassNames from 'classnames'
import PropTypes from 'prop-types'

import './style.css'

import { getLocation } from '../../redux/selectors/router'

const NavbarButton = ({
  route, label, external,
}) => {
  const { pathname } = useSelector(getLocation)
  const dispatch = useDispatch()
  const navigate = (path) => dispatch(push(path))

  if (external) {
    return (
      <a href={external} target='_blank' rel='noopener noreferrer'>
        {label}
      </a>
    )
  }

  return (
    <button
      type='button'
      className={ClassNames('hfui-navbarbutton', { active: pathname === route })}
      onClick={route === pathname ? undefined : () => navigate(route)}
    >
      {label}
    </button>
  )
}

NavbarButton.propTypes = {
  route: PropTypes.string,
  label: PropTypes.oneOfType([
    PropTypes.string, PropTypes.array, PropTypes.element,
  ]).isRequired,
  external: PropTypes.string,
}

NavbarButton.defaultProps = {
  external: '',
  route: '',
}

export default memo(NavbarButton)
