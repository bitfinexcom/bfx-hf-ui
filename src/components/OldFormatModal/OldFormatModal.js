import React, { memo } from 'react'
import PropTypes from 'prop-types'

import Modal from '../../ui/Modal'

const OldFormatModal = ({ changeOldFormatModalState, visible }) => {
  const onSubmit = () => {
    changeOldFormatModalState(false)
  }

  return (
    <Modal
      label='Layout upgrade'
      isOpen={visible}
      onClose={onSubmit}
    >
      <p>Since the v3.12.0 update we have reworked the way of how the application layout works.</p>
      <p>From now on, each component, including the Order form and Ticker symbols, is independent and can be added or removed in the layout settings.</p>
      <br />
      <p>If needed, you can add these components to your custom layout in the layout settings, sorry for the inconvenience.</p>
      <Modal.Footer>
        <Modal.Button
          onClick={onSubmit}
          primary
        >
          Okay
        </Modal.Button>
      </Modal.Footer>
    </Modal>
  )
}

OldFormatModal.propTypes = {
  changeOldFormatModalState: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
}

export default memo(OldFormatModal)
