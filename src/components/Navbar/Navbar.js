import React from 'react'

import NavbarButton from '../NavbarButton'
import './style.css'

export default class Navbar extends React.PureComponent {
  render () {
    const { user, onLogin, onRegister, onLogout } = this.props

    return (
      <div className='dtc-navbar__wrapper'>
        <ul className='dtc-navbar__main-links'>
          <li>
            <NavbarButton
              route='/'
              label='Trading Terminal'
            />
          </li>

          <li>
            <NavbarButton
              route='/data'
              label='Market Data'
            />
          </li>

          <li>
            <NavbarButton
              route='/strategy-editor'
              label='Strategy Editor'
            />
          </li>

          {user.id ? [
            <li key='username' className='full-width'>
              <NavbarButton
                route='/account'
                label={[
                  <p key='username'>Logged in as {user.username}</p>,
                  <i key='icon' className='fas fa-cog'></i>,
                ]}
              />
            </li>,
            <li key='logout'>
              <button onClick={onLogout}>Logout</button>
            </li>
          ] : [
            <li key='login' className='full-width'>
              <button onClick={onLogin}>Login</button>
            </li>,
            <li key='register'>
              <button onClick={onRegister}>Register</button>
            </li>
          ]}
        </ul>
      </div>
    )
  }
}
