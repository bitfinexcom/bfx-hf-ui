import { connect } from 'react-redux'

import UIActions from '../../redux/actions/ui'
import { TRADING_PAGE } from '../../redux/constants/ui'
import { apiClientConnected } from '../../redux/selectors/ws'
import { getHasActiveAlgoOrders, getShowActiveAlgoModal } from '../../redux/selectors/ao'
import {
  getLayouts,
  getActiveExchange,
  getIsRefillBalanceModalVisible,
  getFirstLogin,
  getGuideStatusForPage,
} from '../../redux/selectors/ui'

import Trading from './Trading'

const mapStateToProps = (state = {}) => ({
  layouts: getLayouts(state),
  exID: getActiveExchange(state),
  firstLogin: getFirstLogin(state),
  showAlgoModal: getShowActiveAlgoModal(state),
  apiClientConnected: apiClientConnected(state),
  hasActiveAlgoOrders: getHasActiveAlgoOrders(state),
  isRefillBalanceModalVisible: getIsRefillBalanceModalVisible(state),
  isGuideActive: getGuideStatusForPage(state, TRADING_PAGE),
})

const mapDispatchToProps = dispatch => ({
  deleteLayout: (id) => dispatch(UIActions.deleteLayout(id)),
  createLayout: (id) => dispatch(UIActions.createLayout(id)),
  finishGuide: () => dispatch(UIActions.finishGuide(TRADING_PAGE)),
  saveLayout: (layout, id) => dispatch(UIActions.saveLayout(layout, id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Trading)
