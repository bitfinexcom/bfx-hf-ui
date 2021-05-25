import React from 'react'

import PropTypes from 'prop-types'
import Modal from '../../ui/Modal'
import Button from '../../ui/Button'

export default class SwitchMode extends React.PureComponent {
  static propTypes = {
    authToken: PropTypes.string.isRequired,
    currentMode: PropTypes.string.isRequired,
    changeTradingMode: PropTypes.func.isRequired,
    changeTradingModeModalState: PropTypes.func.isRequired,
    isPaperTrading: PropTypes.bool.isRequired,
    isTradingModeModalVisible: PropTypes.bool.isRequired,
  }

  onTradingModeModalClose() {
    const { changeTradingModeModalState } = this.props
    changeTradingModeModalState(false)
  }

  onTradingModeModalSubmit() {
    const {
      authToken,
      currentMode,
      isPaperTrading,
      changeTradingMode,
    } = this.props
    changeTradingMode(!isPaperTrading, authToken, currentMode)
    location.replace('/index.html') // eslint-disable-line
  }

  render() {
    const { isTradingModeModalVisible } = this.props

    return (
      <Modal
        isOpen={isTradingModeModalVisible}
        onClose={() => this.onTradingModeModalClose()}
        actions={(
          <Button
            green
            onClick={() => this.onTradingModeModalSubmit()}
            label={[
              <p key='text'>Okay</p>,
            ]}
          />
        )}
      >
        <p> The app will reboot after you press Okay. It&apos;s required for switching trading mode. Open algo orders are paused.</p>
      </Modal>
    )
  }
}
