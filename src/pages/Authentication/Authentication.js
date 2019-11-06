import React from 'react'

import HFIcon from '../../ui/HFIcon'
import AuthenticationInitForm from './AuthenticationInitForm'
import AuthenticationUnlockForm from './AuthenticationUnlockForm'
import { propTypes, defaultProps } from './Authentication.props'
import { version } from '../../../package.json'

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
            <HFIcon />
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
