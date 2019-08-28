import { connect } from 'react-redux'

import UIActions from '../../redux/actions/ui'
import {
  getLayouts, getActiveMarket, getActiveExchange
} from '../../redux/selectors/ui'
import { getUser } from '../../redux/selectors/ws_dtc_server'

import Trading from './Trading'

const mapStateToProps = (state = {}, ownProps = {}) => ({
  layouts: getLayouts(state),
  activeMarket: getActiveMarket(state),
  exID: getActiveExchange(state),
  user: getUser(state),
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
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Trading)
