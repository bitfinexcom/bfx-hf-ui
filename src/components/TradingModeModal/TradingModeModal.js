import React from 'react'

import PropTypes from 'prop-types'
import Modal from '../../ui/Modal'
import Button from '../../ui/Button'

export default class SwitchMode extends React.PureComponent {
  static propTypes = {
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
    const { changeTradingMode, isPaperTrading } = this.props
    changeTradingMode(!isPaperTrading)
    window.location.reload()
  }

  render() {
    const { isTradingModeModalVisible } = this.props
    if (!isTradingModeModalVisible) {
      return null
    }

    return (
      <Modal
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
        <p>The app will reboot after you press Okay. It&apos;s required for switching trading mode.</p>
      </Modal>
    )
  }
}
