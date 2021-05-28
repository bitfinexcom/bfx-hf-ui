import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Checkbox } from '@ufx-ui/core'
import _isEmpty from 'lodash/isEmpty'

import Input from '../../ui/Input'
import Button from '../../ui/Button'
import Dropdown from '../../ui/Dropdown'
import {
  getStoredPassword,
  getAutoLoginState,
  isDevEnv as devEnv,
  updateAutoLoginState,
  updateStoredPassword,
} from '../../util/autologin'

const isDevEnv = devEnv()

const MAIN_MODE = { value: 'main', label: 'Production' }
const PAPER_MODE = { value: 'paper', label: 'Paper Trading' }

const OPTIONS = [MAIN_MODE, PAPER_MODE]
const initialAutoLoginSave = getAutoLoginState()

const AuthenticationUnlockForm = ({ isPaperTrading, onUnlock: _onUnlock, onReset }) => {
  const [password, setPassword] = useState('')
  const [autoLoginState, setAutoLoginState] = useState(initialAutoLoginSave)
  const [mode, setMode] = useState(isPaperTrading ? PAPER_MODE.value : MAIN_MODE.value)
  const submitReady = !_isEmpty(password) && !_isEmpty(mode)

  const onUnlock = () => {
    if (!submitReady) return

    if (isDevEnv && password.length) {
      updateStoredPassword(password)
      updateAutoLoginState(autoLoginState)
    }

    _onUnlock(password, mode)
  }

  const onFormSubmit = (event) => {
    event.preventDefault()
    onUnlock()
  }

  useEffect(() => {
    const pass = getStoredPassword()
    if (isDevEnv && pass && autoLoginState) {
      setPassword(pass)
    }
  }, [])

  useEffect(() => {
    if (password && isDevEnv && initialAutoLoginSave) {
      onUnlock()
    }
  }, [password])

  return (
    <div className='hfui-authenticationpage__content'>
      <h2>Honey Framework UI</h2>
      <p>Enter your password to unlock.</p>

      <form className='hfui-authenticationpage__inner-form' onSubmit={onFormSubmit}>
        <Input
          type='password'
          autocomplete='current-password'
          placeholder='Password'
          value={password}
          onChange={setPassword}
        />
        <div className='hfui-authenticationpage__mode-select'>
          <p>Select trading mode</p>

          <Dropdown
            className='hfui-authenticationpage__trading-mode'
            placeholder='Select trading mode...'
            value={OPTIONS.find(o => o.value === mode).value}
            options={OPTIONS}
            onChange={(value) => setMode(value)}
          />
        </div>
        {isDevEnv && (
          <div className='hfui-authenticationpage__dev-mode'>
            <Checkbox
              label='Auto-login in development mode'
              checked={autoLoginState}
              onChange={setAutoLoginState}
            />
          </div>
        )}
        <Button
          onClick={onUnlock}
          disabled={!submitReady}
          label='Unlock'
          green
        />
      </form>

      <div className='hfui-authenticationpage__clear'>
        <p>Alternatively, clear your credentials &amp; and stored data to set a new password.</p>

        <Button
          onClick={onReset}
          label='Clear Data &amp; Reset'
          red
        />
      </div>
    </div>
  )
}

AuthenticationUnlockForm.propTypes = {
  onUnlock: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
  isPaperTrading: PropTypes.bool.isRequired,
}

export default AuthenticationUnlockForm
