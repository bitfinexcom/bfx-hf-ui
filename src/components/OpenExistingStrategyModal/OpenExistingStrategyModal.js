import React from 'react'
import Debug from 'debug'
import _isEmpty from 'lodash/isEmpty'

import Modal from '../../ui/Modal'
import Button from '../../ui/Button'
import Dropdown from '../../ui/Dropdown'

import { propTypes, defaultProps } from './OpenExistingStrategyModal.props'
import './style.css'

import i18n from './i18n.json'

const debug = Debug('hfui:c:open-existing-strategy-modal')
const dictionary = i18n['ru-RU']

export default class OpenExistingStrategyModal extends React.Component {
  static propTypes = propTypes
  static defaultProps = defaultProps

  state = {
    strategyID: null,
    error: '',
  }

  constructor(props) {
    super(props)

    this.onStrategyChange = this.onStrategyChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onStrategyChange(strategyID) {
    this.setState(() => ({ strategyID }))
  }

  onSubmit() {
    const { strategyID } = this.state

    if (!strategyID) {
      this.setState(() => ({ error: 'No strategy selected' }))
      return
    }

    const { onClose, onOpen, strategies } = this.props
    const strategy = strategies.find(s => s.id === strategyID)

    if (!strategy) {
      debug('strategy not found: %s', strategyID)
      return
    }

    onOpen(strategy)
    onClose()
  }

  render() {
    const { onClose, strategies } = this.props
    const { strategyID, error } = this.state

    return (
      <Modal
        onClose={onClose}
        className='hfui-openexistingstrategymodal__wrapper'
        label={dictionary.openStrategy}
        actions={(
          <Button
            onClick={this.onSubmit}
            label='Open'
            green
          />
        )}
      >
        <Dropdown
          value={strategyID}
          onChange={this.onStrategyChange}
          options={strategies.map(s => ({
            label: s.label,
            value: s.id,
          }))}
        />

        {!_isEmpty(error) && (
          <p className='error'>{error}</p>
        )}
      </Modal>
    )
  }
}
