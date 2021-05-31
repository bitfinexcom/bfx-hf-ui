import React, { useState } from 'react'
import _isEmpty from 'lodash/isEmpty'
import PropTypes from 'prop-types'

import Templates from '../StrategyEditor/templates'

import Input from '../../ui/Input'
import Modal from '../../ui/Modal'
import Dropdown from '../../ui/Dropdown'

import './style.css'

const CreateNewStrategyModal = ({
  onSubmit, onClose, gaCreateStrategy, isOpen,
}) => {
  const [label, setLabel] = useState('')
  const [error, setError] = useState('')
  const [template, setTemplate] = useState('Blank')

  const onSubmitHandler = () => {
    if (_isEmpty(label)) {
      setError('Label empty')
      return
    }
    gaCreateStrategy()

    onSubmit(label, template)
    onClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className='hfui-createnewstrategymodal__wrapper'
      label='Create a New Strategy'
    >

      <Input
        type='text'
        placeholder='Label'
        value={label}
        onChange={setLabel}
      />

      <Dropdown
        value={template}
        onChange={setTemplate}
        options={Templates.map(t => ({
          label: t.label,
          value: t.label,
        }))}
      />

      {!_isEmpty(error) && (
      <p className='error'>{error}</p>
      )}

      <Modal.Footer>
        <Modal.Button primary onClick={onSubmitHandler}>
          Create
        </Modal.Button>
      </Modal.Footer>
    </Modal>
  )
}

CreateNewStrategyModal.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  gaCreateStrategy: PropTypes.func,
  isOpen: PropTypes.bool,
}

CreateNewStrategyModal.defaultProps = {
  gaCreateStrategy: () => {},
  isOpen: true,
}

export default CreateNewStrategyModal
