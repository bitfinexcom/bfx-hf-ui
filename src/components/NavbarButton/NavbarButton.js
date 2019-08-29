import React from 'react'
import ClassNames from 'classnames'

import { propTypes, defaultProps } from './NavbarButton.props'
import './style.css'

export default class NavbarButton extends React.PureComponent {
  static propTypes = propTypes
  static defaultProps = defaultProps

  render() {
    const {
      currentRoute, route, navigate, label,
    } = this.props

    return (
      <button
        type='button'
        className={ClassNames('dtc-navbarbutton', { active: currentRoute === route })}
        onClick={route === currentRoute ? () => {} : () => navigate(route)}
      >
        {label}
      </button>
    )
  }
}
