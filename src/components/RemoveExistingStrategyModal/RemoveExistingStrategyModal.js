import React, { useEffect, useState, memo } from 'react'
import PropTypes from 'prop-types'
import _size from 'lodash/size'
import Input from '../../ui/Input'
import Modal from '../../ui/Modal'

import './style.css'

const MAX_STRATEGY_LABEL_LENGTH = 35

const RemoveExistingStrategyModal = ({
  isOpen, onRemoveStrategy, onClose, strategy: { label },
}) => {
  const [canDeleteStrategy, setCanDeleteStrategy] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const isLong = _size(label) > MAX_STRATEGY_LABEL_LENGTH

  const removeStrategy = () => {
    onRemoveStrategy()
    setCanDeleteStrategy(false)
  }

  useEffect(() => {
    if (inputValue !== label) {
      if (canDeleteStrategy) {
        setCanDeleteStrategy(false)
      }
      return
    }
    setCanDeleteStrategy(true)
  }, [inputValue])

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className='hfui-removestrategymodal__wrapper'
      label='Remove Strategy'
    >
      <div className='hfui-removestrategymodal__content'>
        <p>
          Are you sure you want to delete&nbsp;
          <b>{label}</b>
          &nbsp;strategy?
        </p>
        <p>
          <b>WARNING:</b>
          &nbsp;
          <i>This action can not be undone.</i>
        </p>
        <Input
          type='text'
          value={inputValue}
          onChange={setInputValue}
          placeholder={`Type ${isLong ? 'the strategy name' : `"${label}"`} to delete it`}
        />
      </div>
      <Modal.Footer>
        <Modal.Button
          secondary
          onClick={onClose}
        >
          Cancel
        </Modal.Button>
        <Modal.Button
          primary
          disabled={!canDeleteStrategy}
          onClick={removeStrategy}
        >
          Delete
        </Modal.Button>
      </Modal.Footer>
    </Modal>
  )
}

RemoveExistingStrategyModal.propTypes = {
  strategy: PropTypes.shape({
    label: PropTypes.string,
  }),
  isOpen: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  onRemoveStrategy: PropTypes.func.isRequired,
}

RemoveExistingStrategyModal.defaultProps = {
  isOpen: true,
  strategy: {
    label: '',
  },
}

export default memo(RemoveExistingStrategyModal)
