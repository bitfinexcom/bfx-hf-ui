import React, { memo } from 'react'
import PropTypes from 'prop-types'

import Modal from '../../ui/Modal'
import closeElectronApp from '../../redux/helpers/close_electron_app'

const AOPauseModal = ({
  changeAOPauseModalState, visible, onDontShowAgain: _onDontShowAgain, authToken, dms, ga,
}) => {
  const onCancel = () => {
    changeAOPauseModalState(false)
  }

  const onClose = () => {
    changeAOPauseModalState(false)
    setTimeout(closeElectronApp, 100)
  }

  const onDontShowAgain = () => {
    _onDontShowAgain(authToken, dms, ga)
    onClose()
  }

  return (
    <Modal
      label='Algo Orders Pause'
      isOpen={visible}
      onClose={onClose}
    >
      <p>Closing the application while algo orders are active will require you to resume/cancel the algo orders when you relaunch the Honey Framework application.</p>
      <br />
      <p>When you restart the Honey Framework application, you will be prompted to select between the currently active algo orders to which two of the given options can be applied:</p>
      <br />
      <p>1. Resume: The atomic orders placed by the selected algo orders (if active) will be cancelled, and the algo orders will resume placing orders for the remaining amounts. The unselected algo orders will not be resumed and will be lost in perpetuity.</p>
      <p>2. Cancel All: All atomic orders placed by the algo orders (if active) will be cancelled and no algo orders will be resumed.</p>
      <br />
      <p>Note: Atomic orders will remain active if DMS option is disabled.</p>
      <Modal.Footer>
        <Modal.Button
          onClick={onCancel}
        >
          Cancel
        </Modal.Button>
        <Modal.Button
          onClick={onDontShowAgain}
        >
          Don&apos;t show again
        </Modal.Button>
        <Modal.Button
          primary
          onClick={onClose}
        >
          Okay
        </Modal.Button>
      </Modal.Footer>
    </Modal>
  )
}

AOPauseModal.propTypes = {
  changeAOPauseModalState: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
  onDontShowAgain: PropTypes.func.isRequired,
  authToken: PropTypes.string.isRequired,
  dms: PropTypes.bool,
  ga: PropTypes.bool,
}

AOPauseModal.defaultProps = {
  ga: null,
  dms: null,
}

export default memo(AOPauseModal)
