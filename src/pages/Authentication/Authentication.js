import React from 'react'

import AuthenticationInitForm from './AuthenticationInitForm'
import AuthenticationUnlockForm from './AuthenticationUnlockForm'
import { propTypes, defaultProps } from './Authentication.props'
import './style.css'
import { version } from '../../../package.json'
import getLogo from '../../getLogo'

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
            <svg width='60%' viewBox='0 0 437 172' fill='none' xmlns='http://www.w3.org/2000/svg'>
              {getLogo()}
            </svg>
            <div className='hfui-authenticationpage__inner-left-version-container'>
              <div className='hfui-authenticationpage__inner-left-version'>
                <h6>Crafted by Bitfinex</h6>
                <p>
v
                  {version}
                </p>
              </div>
            </div>
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
