import React, { useState, memo } from 'react'
import PropTypes from 'prop-types'
import Debug from 'debug'
import _isEmpty from 'lodash/isEmpty'
import _find from 'lodash/find'

import Modal from '../../ui/Modal'
import { makeShorterLongName } from '../../util/ui'
import Dropdown from '../../ui/Dropdown'

import './style.css'

const debug = Debug('hfui:c:open-existing-strategy-modal')

const MAX_STRATEGY_LABEL_LENGTH = 60

const OpenExistingStrategyModal = ({
  onClose, strategies, isOpen, onOpen,
}) => {
  const [strategyID, setStrategyID] = useState(null)
  const [error, setError] = useState('')

  const onSubmit = () => {
    if (!strategyID) {
      setError('No strategy selected')
      return
    }
    const strategy = _find(strategies, ({ id }) => id === strategyID)

    if (_isEmpty(strategy)) {
      debug('strategy not found: %s', strategyID)
      return
    }

    onOpen(strategy)
    onClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className='hfui-openexistingstrategymodal__wrapper'
      label='Open Strategy'
    >
      <Dropdown
        value={strategyID}
        onChange={setStrategyID}
        options={strategies.map(({ label, id }) => ({
          label: makeShorterLongName(label, MAX_STRATEGY_LABEL_LENGTH),
          value: id,
        }))}
      />

      {!_isEmpty(error) && (
        <p className='error'>{error}</p>
      )}

      <Modal.Footer>
        <Modal.Button onClick={onSubmit} primary>
          Open
        </Modal.Button>
      </Modal.Footer>
    </Modal>
  )
}

OpenExistingStrategyModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onOpen: PropTypes.func.isRequired,
  strategies: PropTypes.arrayOf(PropTypes.object).isRequired,
  isOpen: PropTypes.bool,
}

OpenExistingStrategyModal.defaultProps = {
  isOpen: false,
}

export default memo(OpenExistingStrategyModal)
