import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Input from '../../ui/Input'
import Modal from '../../ui/Modal'

const RemoveExistingStrategyModal = ({
  isOpen,
  onRemoveStrategy,
  onClose,
  strategy: { label = null },
}) => {
  const [canDeleteStrategy, setCanDeleteStrategy] = useState(false)
  const [inputValue, setInputValue] = useState('')

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
          Are you sure you want to delete &nbsp;
          <b>{ label }</b>
            &nbsp; strategy?
        </p>
        <p>
          <b>WARNING: </b>
          <i> This action can not be undone.</i>
        </p>
        <Input
          type='text'
          value={inputValue}
          onChange={setInputValue}
          placeholder={`Type "${label}" to delete`}
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

export default RemoveExistingStrategyModal
