import { connect } from 'react-redux'

import UIActions from '../../redux/actions/ui'
import { TRADING_PAGE } from '../../redux/constants/ui'
import { apiClientConnected } from '../../redux/selectors/ws'
import { getHasActiveAlgoOrders, getShowActiveAlgoModal } from '../../redux/selectors/ao'
import {
  getFirstLogin,
  getGuideStatusForPage,
} from '../../redux/selectors/ui'

import Trading from './Trading'

const mapStateToProps = (state = {}) => ({
  firstLogin: getFirstLogin(state),
  showAlgoModal: getShowActiveAlgoModal(state),
  apiClientConnected: apiClientConnected(state),
  hasActiveAlgoOrders: getHasActiveAlgoOrders(state),
  isGuideActive: getGuideStatusForPage(state, TRADING_PAGE),
})

const mapDispatchToProps = dispatch => ({
  finishGuide: () => dispatch(UIActions.finishGuide(TRADING_PAGE)),
  openNotifications: () => {
    dispatch(UIActions.switchNotifcationPanel())
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Trading)
