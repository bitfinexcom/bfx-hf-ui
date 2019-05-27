import React from 'react'
import { Link } from 'react-router-dom'
import ClassNames from 'classnames'
import { propTypes, defaultProps } from './index.props'

export default class NavBar extends React.PureComponent {
  static propTypes = propTypes

  static defaultProps = defaultProps

  render() {
    const { buttons, location } = this.props

    return (
      <div className='navbar__wrapper'>
        {Object.keys(buttons).map((key) => {
          const item = buttons[key]
          const page = location.pathname.substr(1)

          return (
            <Link to={`/${key}`} key={key}>
              <button
                className={ClassNames({
                  [`navbar-button bp3-button bp3-icon-${item.icon}`]: !!item.icon,
                  active: key === page,
                })}
              >
                {item.label}
              </button>
            </Link>
          )
        })}

        <div className='navbar__wrapper-right'>HF</div>
      </div>
    )
  }
}
