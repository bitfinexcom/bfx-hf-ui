import React from 'react'
import ClassNames from 'classnames'

import './style.css'

export default class NavbarButton extends React.PureComponent {
  render () {
    const { currentRoute, route, navigate, label } = this.props

    return (
      <button
        className={ClassNames('dtc-navbarbutton', { active: currentRoute === route })}
        onClick={route === currentRoute ? () => {} : () => navigate(route)}
      >{label}</button>
    )
  }
}
