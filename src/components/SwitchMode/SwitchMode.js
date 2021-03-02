import React from 'react'

import PropTypes from 'prop-types'
import Switch from 'react-switch'

export default class SwitchMode extends React.PureComponent {
  static propTypes = {
    openTradingModeModal: PropTypes.func.isRequired,
    isPaperTrading: PropTypes.bool.isRequired,
    isTradingModeModalVisible: PropTypes.bool.isRequired,
  }

  toggleTradingMode() {
    const { openTradingModeModal } = this.props
    openTradingModeModal()
  }

  render() {
    const { isPaperTrading, isTradingModeModalVisible } = this.props
    return (
      <Switch
        checked={isPaperTrading}
        onChange={() => this.toggleTradingMode()}
        disabled={isTradingModeModalVisible}
        onColor='#54B361'
        offColor='#d8d8d8'
        height={21}
        width={35}
      />
    )
  }
}
