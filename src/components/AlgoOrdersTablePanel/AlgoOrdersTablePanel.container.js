import { connect } from 'react-redux'

import { getAlgoOrders } from '../../redux/selectors/ws'
import UIActions from '../../redux/actions/ui'

import AlgoOrdersTablePanel from './AlgoOrdersTablePanel'

const mapStateToProps = (state = {}) => ({
  algoOrders: getAlgoOrders(state),
})

const mapDispatchToProps = dispatch => ({
  setFilteredValueWithKey: (key, value) => {
    dispatch(UIActions.setFilteredValueWithKey(key, value))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(AlgoOrdersTablePanel)
