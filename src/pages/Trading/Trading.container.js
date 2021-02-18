import { connect } from 'react-redux'

import UIActions from '../../redux/actions/ui'
import { TRADING_PAGE } from '../../redux/constants/ui'
import { getLayouts, getActiveExchange } from '../../redux/selectors/ui'
import { getActiveAlgoOrders, showActiveOrdersModal } from '../../redux/actions/ao'
import { getHasActiveAlgoOrders, getShowActiveAlgoModal } from '../../redux/selectors/ao'

import Trading from './Trading'

const mapStateToProps = (state = {}) => ({
  layouts: getLayouts(state),
  exID: getActiveExchange(state),
  firstLogin: state.ui.firstLogin,
  showAlgoModal: getShowActiveAlgoModal(state),
  hasActiveAlgoOrders: getHasActiveAlgoOrders(state),
  isGuideActive: state.ui[`${TRADING_PAGE}_GUIDE_ACTIVE`],
})

const mapDispatchToProps = dispatch => ({
  getActiveAOs: () => dispatch(getActiveAlgoOrders()),
  deleteLayout: (id) => dispatch(UIActions.deleteLayout(id)),
  createLayout: (id) => dispatch(UIActions.createLayout(id)),
  finishGuide: () => dispatch(UIActions.finishGuide(TRADING_PAGE)),
  saveLayout: (layout, id) => dispatch(UIActions.saveLayout(layout, id)),
  showActiveAOsModal: (status) => dispatch(showActiveOrdersModal(status)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Trading)
