import React from 'react'
import { Link } from 'react-router-dom'

import './style.css'

export default class Navbar extends React.PureComponent {

  constructor (props) {
    super(props)

    this.state = {
      'overview' : {
        label: 'Overview',
        icon: 'home',
        homepage: true
      },
      'algo-orders': {
        label: 'Algo Orders',
        icon: 'function'
      },
      'execution': {
        label: 'Executuion',
        icon: 'play'
      },
      'backtesting': {
        label: 'Backtesting',
        icon: 'series-derived'
      },
      'settings':{
        label: 'Settings',
        icon:'cog'
      }
    }
  }

  render () {
    let buttons = Object.keys(this.state).map((key) => {
      let item = this.state[key]
      let page = this.props.location.pathname.substr(1)

      let classes = [
        item.slug,
        'pt-button',
        'pt-minimal',
        'pt-icon-' + item.icon
      ]

      let isHomePage = item.homepage && page === ""

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
