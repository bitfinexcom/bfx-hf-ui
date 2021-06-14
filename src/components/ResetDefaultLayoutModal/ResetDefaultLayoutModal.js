import React, { memo, useCallback } from 'react'
import PropTypes from 'prop-types'
import Modal from '../../ui/Modal'

const ResetDefaultLayoutModal = ({
  layout, isOpen, onClose, onSubmit,
}) => {
  const onSubmitClick = useCallback(() => {
    onSubmit(layout)
    onClose()
    location.reload() // eslint-disable-line
  }, [layout])
  return (
    <Modal
      label={`Reset ${layout} layout?`}
      isOpen={isOpen}
      onClose={onClose}
    >
      <p>
        Are you sure want to reset
        {' '}
        {layout}
        {' '}
        layout?
      </p>
      <Modal.Footer>
        <Modal.Button primary onClick={onSubmitClick}>
          OK
        </Modal.Button>
        <Modal.Button onClick={onClose}>
          Cancel
        </Modal.Button>
      </Modal.Footer>
    </Modal>
  )
}

ResetDefaultLayoutModal.propTypes = {
  layout: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
}

export default memo(ResetDefaultLayoutModal)
