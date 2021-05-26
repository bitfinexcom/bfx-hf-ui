import React, { memo } from 'react'
import PropTypes from 'prop-types'
import Switch from 'react-switch'

const SwitchMode = ({
  isPaperTrading, isTradingModeModalVisible, openTradingModeModal,
}) => (
  <Switch
    checked={isPaperTrading}
    onChange={openTradingModeModal}
    disabled={isTradingModeModalVisible}
    onColor='#54b361'
    offColor='#d8d8d8'
    height={21}
    width={35}
  />
)

SwitchMode.propTypes = {
  openTradingModeModal: PropTypes.func.isRequired,
  isPaperTrading: PropTypes.bool.isRequired,
  isTradingModeModalVisible: PropTypes.bool.isRequired,
}

export default memo(SwitchMode)
