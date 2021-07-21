import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import _isEmpty from 'lodash/isEmpty'
import PropTypes from 'prop-types'

import Input from '../../ui/Input'
import Modal from '../../ui/Modal'

import './style.css'
import { createLayout } from '../../redux/actions/ui'

const CreateNewLayoutModal = ({ onClose, isOpen }) => {
  const dispatch = useDispatch()
  const [name, setName] = useState('')
  const [error, setError] = useState('')

  const onSubmitHandler = () => {
    if (_isEmpty(name)) {
      setError('Name empty')
      return
    }

    dispatch(createLayout(name))
    setName('')
    onClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className='hfui-createnewlayoutmodal__wrapper'
      label='Add Layout'
    >
      <Input
        type='text'
        placeholder='Layout Name'
        value={name}
        onChange={setName}
      />

      {!_isEmpty(error) && (
        <p className='error'>{error}</p>
      )}

      <Modal.Footer>
        <Modal.Button
          primary
          onClick={onSubmitHandler}
        >
          Add Layout
        </Modal.Button>
      </Modal.Footer>
    </Modal>
  )
}

CreateNewLayoutModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
}

export default CreateNewLayoutModal
