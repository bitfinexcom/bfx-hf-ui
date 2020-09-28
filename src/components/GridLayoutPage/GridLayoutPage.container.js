import { connect } from 'react-redux'

import UIActions from '../../redux/actions/ui'
import {
  getLayouts, getActiveMarket, getActiveExchange,
} from '../../redux/selectors/ui'

import GridLayoutPage from './GridLayoutPage'

const mapStateToProps = (state = {}) => ({
  layouts: getLayouts(state),
  activeMarket: getActiveMarket(state),
  exID: getActiveExchange(state),
  lang: state.ui.lang,
})

const mapDispatchToProps = dispatch => ({
  saveLayout: (layout, id) => {
    dispatch(UIActions.saveLayout(layout, id))
  },

  createLayout: (id, tradingEnabled) => {
    dispatch(UIActions.createLayout(id, tradingEnabled))
  },

  deleteLayout: (id) => {
    dispatch(UIActions.deleteLayout(id))
  },
})

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(GridLayoutPage)
