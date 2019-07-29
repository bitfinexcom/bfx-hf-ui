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
      <div className='hfui_sidenavbar'>
        <div className='hfui_sidenavbar__header'>
          <img src='/HF-icon.png' alt='Honey Framework' />
          <h2>HF UI</h2>
        </div>

        {Object.keys(buttons).map((key) => {
          const item = buttons[key]
          const page = location.pathname.substr(1)

          return (
            <Link to={`/${key}`} key={key}>
              <button
                className={ClassNames({ active: key === page })}
                type='button'
              >
                {item.label}
              </button>
            </Link>
          )
        })}
      </div>
    )
  }
}
