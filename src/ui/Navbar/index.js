import React from 'react'
import { Link } from 'react-router-dom'
import { propTypes, defaultProps } from './index.props'
import ClassNames from 'classnames'

import './style.css'

export default class Navbar extends React.PureComponent {
  static propTypes = propTypes
  static defaultProps = defaultProps

  render () {
    return (
      <div className='navbar__wrapper'>
        {Object.keys(this.props.buttons).map((key) => {
          const item = this.props.buttons[key]
          const page = this.props.location.pathname.substr(1)

          return (
            <Link to={"/"+key} key={key}>
              <button
                className={ClassNames({
                  [`pt-button pt-icon-${item.icon}`]: !!item.icon,
                  active: key === page
                })}
              >{item.label}</button>
            </Link>
          )
        })}

        <div className='navbar__wrapper-right'>HF</div>
      </div>
    )
  }
}
