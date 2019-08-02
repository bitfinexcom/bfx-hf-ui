import React from 'react'
import { Link } from 'react-router-dom'
import ClassNames from 'classnames'
import { propTypes, defaultProps } from './index.props'

export default class NavBar extends React.PureComponent {
  static propTypes = propTypes

  static defaultProps = defaultProps

  render() {
    const { buttons, location = { pathname: '/api-keys' } } = this.props

    return (
      <div>
        {Object.keys(buttons).map((key) => {
          const item = buttons[key]
          const page = location.pathname.substr(1)
          return (
            <button
              key={key}
              className={ClassNames({ active: key === page })}
              type='button'
            >
              {item.label}
            </button>
          )
        })}
      </div>
    )
  }
}
