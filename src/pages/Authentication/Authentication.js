import React, { memo } from 'react'

import HFIcon from '../../ui/HFIcon'
import AuthenticationInitForm from './AuthenticationInitForm'
import AuthenticationUnlockForm from './AuthenticationUnlockForm'
import AuthenticationConnectingForm from './AuthenticationConnectingForm'
import { version } from '../../../package.json'

import './style.css'

const Authentication = ({
  wsConnected,
  configured,
  onUnlock,
  onInit,
  onReset,
  isPaperTrading,
}) => (
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

      {!wsConnected ? (
        <AuthenticationConnectingForm />
      ) : configured ? (
        <AuthenticationUnlockForm
          onUnlock={onUnlock}
          onReset={onReset}
          isPaperTrading={isPaperTrading}
        />
      ) : (
        <AuthenticationInitForm
          onInit={onInit}
        />
      )}
    </div>
  </div>
)

export default memo(Authentication)
