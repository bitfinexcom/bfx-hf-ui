import React from 'react'
import { Link } from 'react-router-dom'
import { propTypes, defaultProps } from './index.props'

import './style.css'

export default class Navbar extends React.PureComponent {

  static propTypes = propTypes
  static defaultProps = defaultProps

  render () {
    const buttons = Object.keys(this.props.buttons).map((key) => {
      let item = this.props.buttons[key]
      let page = this.props.location.pathname.substr(1)

      let classes = [
        item.slug,
        'pt-button',
        'pt-minimal',
        'pt-icon-' + item.icon
      ]

      const isHomePage = (item.homepage && page === "")

      if(key === page || isHomePage){ 
        classes.push('pt-active')
      }

      classes = classes.join(' ')

      return (
        <Link to={"/"+key} key={key}>
          <button className={classes}>{item.label}</button>
        </Link>
      )
    })

    return (
      <div className='pt-navbar'>
        <div className='pt-navbar-group pt-align-left'>
          <div className='pt-navbar-header'>
            <img src='/HF-logo.png' height='50' alt='HF' />
          </div>
        </div>

        <div className='pt-navbar-group pt-align-right'>
          {buttons}
        </div>
      </div>
    )
  }
}
