import { connect } from 'react-redux'
import {
  getLayouts, getActiveMarket, getActiveExchange,
} from '../../redux/selectors/ui'
import UIActions from '../../redux/actions/ui'

import MarketData from './MarketData'

const mapStateToProps = (state = {}) => ({
  layouts: getLayouts(state),
  activeMarket: getActiveMarket(state),
  exID: getActiveExchange(state),
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
})

export default connect(mapStateToProps, mapDispatchToProps)(MarketData)
