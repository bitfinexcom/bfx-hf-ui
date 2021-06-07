import React, { memo } from 'react'

import PropTypes from 'prop-types'
import Modal from '../../ui/Modal'

const TradingModeModal = ({
  authToken,
  currentMode,
  isPaperTrading,
  changeTradingMode,
  changeTradingModeModalState,
  isTradingModeModalVisible,
}) => {
  const onTradingModeModalClose = () => {
    changeTradingModeModalState(false)
  }

  const onTradingModeModalSubmit = () => {
    changeTradingMode(!isPaperTrading, authToken, currentMode)
    location.replace('/index.html') // eslint-disable-line
  }

  return (
    <Modal
      label='Switch Trade Mode'
      isOpen={isTradingModeModalVisible}
      onClose={onTradingModeModalClose}
    >
      <p> The app will reboot after you press Okay. It&apos;s required for switching trading mode. Open algo orders are paused.</p>
      <Modal.Footer>
        <Modal.Button primary onClick={onTradingModeModalSubmit}>
          Okay
        </Modal.Button>
      </Modal.Footer>
    </Modal>
  )
}

TradingModeModal.propTypes = {
  authToken: PropTypes.string.isRequired,
  currentMode: PropTypes.string.isRequired,
  changeTradingMode: PropTypes.func.isRequired,
  changeTradingModeModalState: PropTypes.func.isRequired,
  isPaperTrading: PropTypes.bool.isRequired,
  isTradingModeModalVisible: PropTypes.bool.isRequired,
}

export default memo(TradingModeModal)
