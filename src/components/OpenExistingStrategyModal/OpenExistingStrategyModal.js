import React from 'react'
import aes from 'aes-js'
import scrypt from 'scrypt-js'
import buffer from 'scrypt-js/thirdparty/buffer'
import Debug from 'debug'
import _isEmpty from 'lodash/isEmpty'

import Modal from '../../ui/Modal'
import Input from '../../ui/Input'
import Button from '../../ui/Button'
import Dropdown from '../../ui/Dropdown'

import { propTypes, defaultProps } from './OpenExistingStrategyModal.props'
import './style.css'

const debug = Debug('hfui:c:open-existing-strategy-modal')

export default class OpenExistingStrategyModal extends React.Component {
  static propTypes = propTypes
  static defaultProps = defaultProps

  state = {
    strategyID: null,
    password: '',
    error: '',
  }

  constructor(props) {
    super(props)

    this.onPasswordChange = this.onPasswordChange.bind(this)
    this.onStrategyChange = this.onStrategyChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onPasswordChange(password) {
    this.setState(() => ({ password }))
  }

  onStrategyChange(strategyID) {
    this.setState(() => ({ strategyID }))
  }

  onSubmit() {
    const { strategyID, password } = this.state

    if (!strategyID) {
      this.setState(() => ({ error: 'No strategy selected' }))
      return
    } if (_isEmpty(password)) {
      this.setState(() => ({ error: 'Password field empty' }))
      return
    }

    const {
      onClose, onOpen, strategies, authToken,
    } = this.props

    const strategy = strategies.find(s => s.id === strategyID)

    if (!strategy) {
      debug('strategy not found: %s', strategyID)
      return
    }

    const pwBuff = new buffer.SlowBuffer(password.normalize('NFKC'))
    const saltBuff = new buffer.SlowBuffer(`${authToken}`.normalize('NFKC'))

    scrypt(pwBuff, saltBuff, 1024, 8, 1, 32, (error, progress, key) => {
      if (error) {
        debug('error creating decryption key: %s', error)
        return
      }

      if (!key) {
        return
      }

      const strategyFields = Object.keys(strategy)
      const decryptedStrategy = {
        id: strategy.id,
        label: strategy.label,
      }

      strategyFields.forEach((field) => {
        if (field === 'id' || field === 'label') {
          return
        }

        const aesCTR = new aes.ModeOfOperation.ctr(key) // eslint-disable-line
        const resBytes = aesCTR.decrypt(aes.utils.hex.toBytes(strategy[field]))
        decryptedStrategy[field] = aes.utils.utf8.fromBytes(resBytes)
      })

      if (decryptedStrategy.cryptedLabel !== decryptedStrategy.label) {
        this.setState(() => ({ error: 'Wrong password' }))
      } else {
        onOpen(decryptedStrategy)
        onClose()
      }
    })
  }

  render() {
    const { onClose, strategies } = this.props
    const { strategyID, password, error } = this.state

    return (
      <Modal
        onClose={onClose}
        className='hfui-openexistingstrategymodal__wrapper'
      >
        <p>Open Strategy</p>

        <Dropdown
          label='Strategy'
          value={strategyID}
          onChange={this.onStrategyChange}
          options={strategies.map(s => ({
            label: s.label,
            value: s.id,
          }))}
        />

        <p className='notice'>Enter the password used to encrypt the strategy</p>

        <Input
          type='password'
          label='Strategy Password'
          value={password}
          onChange={this.onPasswordChange}
        />

        <Button
          onClick={this.onSubmit}
          label='Decrypt and Open'
        />

        {!_isEmpty(error) && (
          <p className='error'>{error}</p>
        )}
      </Modal>
    )
  }
}
