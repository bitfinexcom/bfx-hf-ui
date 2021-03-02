import { connect } from 'react-redux'

import UIActions from '../../redux/actions/ui'
import { getIsPaperTrading, getIsRefillBalanceModalVisible, getIsTradingModeModalVisible } from '../../redux/selectors/ui'

import TradingModeModal from './TradingModeModal'

const mapStateToProps = (state = {}) => ({
  isPaperTrading: getIsPaperTrading(state),
  isTradingModeModalVisible: getIsTradingModeModalVisible(state),
  isRefillBalanceModalVisible: getIsRefillBalanceModalVisible(state),
})

const mapDispatchToProps = dispatch => ({
  changeTradingModeModalState: (isVisible) => dispatch(UIActions.changeTradingModeModalState(isVisible)),
  changeTradingMode: (isPaperTrading) => dispatch(UIActions.setTradingMode(isPaperTrading)),
})

export default connect(mapStateToProps, mapDispatchToProps)(TradingModeModal)
