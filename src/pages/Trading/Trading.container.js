import { connect } from 'react-redux'

import UIActions from '../../redux/actions/ui'
import { TRADING_PAGE } from '../../redux/constants/ui'

import {
  getLayouts, getActiveMarket, getActiveExchange,
} from '../../redux/selectors/ui'

import Trading from './Trading'

const mapStateToProps = (state = {}) => ({
  layouts: getLayouts(state),
  activeMarket: getActiveMarket(state),
  exID: getActiveExchange(state),
  firstLogin: state.ui.firstLogin,
  isGuideActive: state.ui[`${TRADING_PAGE}_GUIDE_ACTIVE`],
})

const mapDispatchToProps = dispatch => ({
  saveLayout: (layout, id) => {
    dispatch(UIActions.saveLayout(layout, id))
  },

  createLayout: (id) => {
    dispatch(UIActions.createLayout(id))
  },

  deleteLayout: (id) => {
    dispatch(UIActions.deleteLayout(id))
  },

  finishGuide() {
    dispatch(UIActions.finishGuide(TRADING_PAGE))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Trading)
