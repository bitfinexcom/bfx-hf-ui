import React from 'react'

import './style.css'

export default class Navbar extends React.PureComponent {
  render () {
    return (
      <div className='pt-navbar'>
        <div className='pt-navbar-group pt-align-left'>
          <div className='pt-navbar-header'>
            <img src='/HF-logo.png' height='50' alt='HF' />
          </div>
        </div>

        <div className='pt-navbar-group pt-align-right'>
          <button className='pt-button pt-minimal pt-icon-home'>Overview</button>
          <button className='pt-button pt-minimal pt-icon-function'>Algo Orders</button>
          <button className='pt-button pt-minimal pt-icon-play'>Execution</button>
          <button className='pt-button pt-minimal pt-icon-series-derived pt-active'>Backtesting</button>
          <button className='pt-button pt-minimal pt-icon-cog'>Settings</button>
        </div>
      </div>
    )
  }
}
