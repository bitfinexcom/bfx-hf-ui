import React, { useState } from 'react'
import PropTypes from 'prop-types'
import _isEmpty from 'lodash/isEmpty'

import Button from '../../ui/Button'
import Input from '../../ui/Input'

const AuthenticationInitForm = ({ onInit }) => {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const onSubmit = () => {
    onInit(password)
  }
  const submitReady = (
    (!_isEmpty(password) && !_isEmpty(confirmPassword))
    && (password === confirmPassword)
  )

  return (
    <div className='hfui-authenticationpage__content'>
      <h2>Honey Framework UI</h2>
      <p>Create a password to encrypt your API credentials &amp; strategies. All data is stored locally, and your password is hashed.</p>

      <form className='hfui-authenticationpage__inner-form'>
        <Input
          type='text'
          name='username'
          placeholder='Username'
          autocomplete='username'
          style={{ display: 'none' }}
        />

        <Input
          type='password'
          autocomplete='new-password'
          placeholder='Password'
          value={password}
          onChange={setPassword}
        />

        <Input
          type='password'
          autocomplete='new-password'
          placeholder='Confirm password'
          value={confirmPassword}
          onChange={setConfirmPassword}
        />

        <Button
          onClick={onSubmit}
          disabled={!submitReady}
          label='Save Credentials'
          green
        />

      </form>
    </div>
  )
}

AuthenticationInitForm.propTypes = {
  onInit: PropTypes.func.isRequired,
}

export default AuthenticationInitForm
