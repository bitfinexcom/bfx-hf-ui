import { connect } from 'react-redux'

import UIActions from '../../redux/actions/ui'
import WSActions from '../../redux/actions/ws'
import { getAuthToken } from '../../redux/selectors/ws'
import {
  getCurrentMode,
  getIsPaperTrading,
  getIsTradingModeModalVisible,
  getIsRefillBalanceModalVisible,
} from '../../redux/selectors/ui'

import TradingModeModal from './TradingModeModal'

const mapStateToProps = (state = {}) => ({
  authToken: getAuthToken(state),
  currentMode: getCurrentMode(state),
  isPaperTrading: getIsPaperTrading(state),
  isTradingModeModalVisible: getIsTradingModeModalVisible(state),
  isRefillBalanceModalVisible: getIsRefillBalanceModalVisible(state),
})

const mapDispatchToProps = dispatch => ({
  changeTradingModeModalState: (isVisible) => dispatch(UIActions.changeTradingModeModalState(isVisible)),
  changeTradingMode: (isPaperTrading, authToken, currentMode) => {
    dispatch(UIActions.setTradingMode(isPaperTrading))
    dispatch(WSActions.send(['algo_order.pause', authToken, currentMode]))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(TradingModeModal)
