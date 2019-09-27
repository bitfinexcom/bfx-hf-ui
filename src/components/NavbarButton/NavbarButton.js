import React from 'react'
import ClassNames from 'classnames'

import { propTypes, defaultProps } from './NavbarButton.props'
import './style.css'

export default class NavbarButton extends React.PureComponent {
  static propTypes = propTypes
  static defaultProps = defaultProps

  render() {
    const {
      currentRoute, route, navigate, label, external,
    } = this.props
    if (external) {
      return (
        <a
          href={`${external}`}
        >
          {label}
        </a>
      )
    }
    return (
      <button
        type='button'
        className={ClassNames('hfui-navbarbutton', { active: currentRoute === route })}
        onClick={route === currentRoute ? () => {} : () => navigate(route)}
      >
        {label}
      </button>
    )
  }
}
