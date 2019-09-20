import React from 'react'

import AuthenticationInitForm from './AuthenticationInitForm'
import AuthenticationUnlockForm from './AuthenticationUnlockForm'
import { propTypes, defaultProps } from './Authentication.props'
import './style.css'

export default class Authentication extends React.PureComponent {
  static propTypes = propTypes
  static defaultProps = defaultProps

  render() {
    const {
      configured, onUnlock, onInit, onReset,
    } = this.props

    return (
      <div className='hfui-authenticationpage__wrapper'>
        <div className='hfui-authenticationpage__inner'>
          <div className='hfui-authenticationpage__inner-left'>
            <img
              alt='HF UI'
              src='/HF-icon.png'
            />
          </div>

          {configured ? (
            <AuthenticationUnlockForm
              onUnlock={onUnlock}
              onReset={onReset}
            />
          ) : (
            <AuthenticationInitForm
              onInit={onInit}
            />
          )}
        </div>
      </div>
    )
  }
}
