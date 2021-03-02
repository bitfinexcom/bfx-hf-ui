import { connect } from 'react-redux'

import UIActions from '../../redux/actions/ui'
import { getIsPaperTrading, getIsRefillBalanceModalVisible, getIsTradingModeModalVisible } from '../../redux/selectors/ui'

import SwitchMode from './SwitchMode'

const mapStateToProps = (state = {}) => ({
  isPaperTrading: getIsPaperTrading(state),
  isTradingModeModalVisible: getIsTradingModeModalVisible(state),
  isRefillBalanceModalVisible: getIsRefillBalanceModalVisible(state),
})

const mapDispatchToProps = dispatch => ({
  openTradingModeModal: () => {
    dispatch(UIActions.changeTradingModeModalState(true))
  },
  onRefillClick: () => {
    dispatch(UIActions.changeReffilBalanceModalState(true))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(SwitchMode)
