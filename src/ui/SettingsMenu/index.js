import React from 'react'
import { Link } from 'react-router-dom'
import ClassNames from 'classnames'
import { propTypes, defaultProps } from './index.props'

export default class NavBar extends React.PureComponent {
  static propTypes = propTypes

  static defaultProps = defaultProps

  render() {
    const { buttons, location = { pathname: '/' } } = this.props

    return (
      <div className='hfui_menu'>
        {Object.keys(buttons).map((key) => {
          const item = buttons[key]
          const page = location.pathname.substr(1)

          return (
            <button
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
