import { connect } from 'react-redux'

import { getActiveMarket } from '../../redux/selectors/ui'
import { getAllOrders } from '../../redux/selectors/ws'
import UIActions from '../../redux/actions/ui'

import AtomicOrdersTablePanel from './AtomicOrdersTablePanel'

const mapStateToProps = (state = {}) => {
  return {
    activeMarket: getActiveMarket(state),
    atomicOrders: getAllOrders(state),
  }
}

const mapDispatchToProps = dispatch => ({
  setFilteredValueWithKey: (key, value) => {
    dispatch(UIActions.setFilteredValueWithKey(key, value))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(AtomicOrdersTablePanel)
