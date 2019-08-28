import React from 'react'
import _isEmpty from 'lodash/isEmpty'

import APICredentialsBox from '../../components/APICredentialsBox'
import StatusBar from '../../components/StatusBar'
import Button from '../../ui/Button'
import Input from '../../ui/Input'

import './style.css'

export default class Account extends React.Component {
  state = {
    password: '',
    newPassword: '',
    confirmNewPassword: '',
    changePasswordError: '',
  }

  constructor (props) {
    super(props)

    this.onChangePassword = this.onChangePassword.bind(this)
  }

  onFieldChange (key, value) {
    this.setState(() => ({ [key]: value }))
  }

  onChangePassword () {
    const { password, newPassword, confirmNewPassword } = this.state
    const { changePassword } = this.props

    if (_isEmpty(password)) {
      return this.setChangePasswordError('Password required')
    } else if (_isEmpty(newPassword)) {
      return this.setChangePasswordError('New password required')
    } else if (newPassword !== confirmNewPassword) {
      return this.setChangePasswordError('Passwords do not match')
    }

    changePassword(password, newPassword)

    this.setState(() => ({
      password: '',
      newPassword: '',
      confirmNewPassword: '',
      changePasswordError: '',
    }))
  }

  setChangePasswordError (changePasswordError) {
    this.setState(() => ({ changePasswordError }))
  }

  onClearCredentials (exID) {
    const { clearCredentials } = this.props
    clearCredentials(exID)
  }

  onChangePlan (plan) {
    const { user, navigate, onChangePlan } = this.props
    const { subscription } = user

    if (!subscription) {
      return navigate('/pricing')
    }
    
    onChangePlan(plan)
  }

  onDowngrade (plan) {
    const { onDowngrade } = this.props
    onDowngrade(plan)
  }

  render () {
    const { user, navigate } = this.props
    const {
      password, newPassword, confirmNewPassword, changePasswordError,
    } = this.state

    if (!user || !user.id) {
      navigate('/')
      return null
    }

    return (
      <div className='dtc-accountpage__wrapper'>
        <div className='dtc-accountpage__inner'>
          <div className='dtc-accountpage__left'>
            <h3>Account Settings</h3>
            <ul>
              <li>
                <div className='label'>Username</div>
                <div className='value'>{user.username}</div>
              </li>
              <li>
                <div className='label'>E-Mail</div>
                <div className='value'>{user.email}</div>
              </li>

              <li className='dtc-accountpage__subscription'>
                <div className='label'>Subscription</div>
                <div className='value'>
                  {user.subscription === 2
                    ? <p>Pro <span className='price'>($37.50/mo)</span></p>
                    : user.subscription === 1
                      ? <p>Basic <span className='price'>($12.50/mo)</span></p>
                      : <p>Free</p>
                  }

                  <div className='buttons'>
                    {(user.subscription === 1 || !user.subscription) && (
                      <Button
                        label='Upgrade to Pro ($37.50/mo)'
                        onClick={this.onChangePlan.bind(this, 565475)}
                        green
                      />
                    )}

                    {!user.subscription && (
                      <Button
                        label='Upgrade to Basic ($12.50/mo)'
                        onClick={() => navigate('/pricing')}
                        green
                      />
                    )}

                    {user.subscription === 2 && (
                      <Button
                        label='Downgrade to Basic ($12.50/mo)'
                        onClick={this.onChangePlan.bind(this, 565474)}
                      />
                    )}
                  </div>

                  <p
                    className='link'
                    onClick={() => navigate('/pricing')}
                  >Go to pricing page</p>

                  {user.cancelSubscriptionURL && (
                    <a
                      className='link'
                      href={user.cancelSubscriptionURL}
                      target='_blank'
                      rel='noopener noreferrer'
                    >Cancel Subscription</a>
                  )}

                  {user.updateBillingURL && (
                    <a
                      className='link'
                      href={user.updateBillingURL}
                      target='_blank'
                      rel='noopener noreferrer'
                    >Update Billing Information</a>
                  )}
                </div>
              </li>

              <li className='dtc-accountpage__changepassword'>
                <div className='label'>Change Password</div>
                <div className='value'>
                  <Input
                    type='password'
                    label='Current Password'
                    value={password}
                    onChange={this.onFieldChange.bind(this, 'password')}
                  />

                  <Input
                    type='password'
                    label='New Password'
                    value={newPassword}
                    onChange={this.onFieldChange.bind(this, 'newPassword')}
                  />

                  <Input
                    type='password'
                    label='Confirm Password'
                    value={confirmNewPassword}
                    onChange={this.onFieldChange.bind(this, 'confirmNewPassword')}
                  />

                  <Button
                    label='Change Password'
                    onClick={this.onChangePassword}
                  />

                  {!_isEmpty(changePasswordError) && (
                    <p className='error'>{changePasswordError}</p>
                  )}
                </div>
              </li>
            </ul>
          </div>

          <div className='dtc-accountpage__right'>
            <h3>API Keys</h3>
            <ul>
              <APICredentialsBox
                user={user}
                exID='bitfinex'
                onClear={this.onClearCredentials.bind(this, 'bitfinex')}
              />
              <APICredentialsBox
                user={user}
                exID='binance'
                onClear={this.onClearCredentials.bind(this, 'binance')}
              />
            </ul>
          </div>
        </div>

        <StatusBar displayLayoutControls={false} />
      </div>
    )
  }
}
 