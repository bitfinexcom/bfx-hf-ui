import React, { useState } from 'react'
import _isEmpty from 'lodash/isEmpty'
import PropTypes from 'prop-types'

import Modal from '../../ui/Modal'
import Dropdown from '../../ui/Dropdown'
import {
  COMPONENT_TYPES, COMPONENT_LABELS,
} from '../GridLayout/GridLayout.helpers'

import './style.css'

const AddLayoutComponentModal = ({ onClose, isOpen, layoutDef }) => {
  const [error, setError] = useState('')
  const [componentType, setComponentType] = useState(COMPONENT_LABELS.CHART)

  const onSubmitHandler = () => {
    if (_isEmpty(componentType) || !COMPONENT_LABELS[componentType]) {
      setError('Invalid Component')
      return
    }

    // onSubmit(componentType)
    onClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className='hfui-addlayoutcomponentmodal__wrapper'
      label='Add Component'
    >
      <Dropdown
        value={componentType}
        onChange={setComponentType}
        options={Object.values(COMPONENT_TYPES).map(type => ({
          label: COMPONENT_LABELS[type],
          value: type,
        }))}
      />

      {!_isEmpty(error) && (
        <p className='error'>{error}</p>
      )}

      <Modal.Footer>
        <Modal.Button
          primary
          onClick={onSubmitHandler}
        >
          Add Component
        </Modal.Button>
      </Modal.Footer>
    </Modal>
  )
}

AddLayoutComponentModal.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
}

export default AddLayoutComponentModal
