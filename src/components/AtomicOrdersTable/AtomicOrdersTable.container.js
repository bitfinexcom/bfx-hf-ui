import { connect } from 'react-redux'
import Debug from 'debug'

import { getAuthToken } from '../../redux/selectors/ws'
import WSActions from '../../redux/actions/ws'
import GAActions from '../../redux/actions/google_analytics'

import AtomicOrdersTable from './AtomicOrdersTable'

const debug = Debug('hfui:c:atomic-orders-table')

const mapStateToProps = (state = {}) => ({
  authToken: getAuthToken(state),
  filteredAtomicOrders: state.ui.filteredAtomicOrders,
})

const mapDispatchToProps = dispatch => ({
  cancelOrder: (exID, authToken, order) => {
    const { id, symbol } = order

    debug('cancelling order %d [%s]', id, symbol)
    dispatch(WSActions.send(['order.cancel', authToken, exID, symbol, id]))
  },
  gaCancelOrder: () => {
    dispatch(GAActions.cancelAtomicOrder())
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(AtomicOrdersTable)
