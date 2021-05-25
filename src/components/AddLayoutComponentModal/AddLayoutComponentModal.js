import React, { useState } from 'react'
import _isEmpty from 'lodash/isEmpty'
import PropTypes from 'prop-types'

import Modal from '../../ui/Modal'
import Button from '../../ui/Button'
import Dropdown from '../../ui/Dropdown'
import {
  COMPONENT_TYPES, COMPONENT_LABELS,
} from '../GridLayout/GridLayout.helpers'

import './style.css'

function AddLayoutComponentModal(props) {
  const { onSubmit, onClose } = props
  const [error, setError] = useState('')
  const [componentType, setComponentType] = useState(COMPONENT_LABELS.CHART)

  const onComponentTypeChange = (_componentType) => setComponentType({ componentType: _componentType })

  const onSubmitHandler = () => {
    if (_isEmpty(componentType) || !COMPONENT_LABELS[componentType]) {
      setError({ error: 'Invalid Component' })
      return
    }

    onSubmit(componentType)
    onClose()
  }

  return (
    <Modal
      onClose={onClose}
      className='hfui-addlayoutcomponentmodal__wrapper'
      label='Add Component'
      actions={(
        <Button
          green
          onClick={onSubmitHandler}
          label={[
            <i key='icon' className='icon-plus' />,
            <p key='text'>Add Component</p>,
          ]}
        />
        )}
    >
      <Dropdown
        value={componentType}
        onChange={onComponentTypeChange}
        options={Object.values(COMPONENT_TYPES).map(type => ({
          label: COMPONENT_LABELS[type],
          value: type,
        }))}
      />

      {!_isEmpty(error) && (
      <p className='error'>{error}</p>
      )}
    </Modal>
  )
}

AddLayoutComponentModal.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
}
