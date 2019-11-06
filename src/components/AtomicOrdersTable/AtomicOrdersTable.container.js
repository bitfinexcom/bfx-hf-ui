import { connect } from 'react-redux'
import Debug from 'debug'

import { getAuthToken } from '../../redux/selectors/ws'
import WSActions from '../../redux/actions/ws'

import AtomicOrdersTable from './AtomicOrdersTable'

const debug = Debug('hfui:c:atomic-orders-table')

const mapStateToProps = (state = {}, ownProps = {}) => ({ // eslint-disable-line
  authToken: getAuthToken(state),
})

const mapDispatchToProps = dispatch => ({
  cancelOrder: (exID, authToken, order) => {
    const { id, symbol } = order

    debug('cancelling order %d [%s]', id, symbol)
    dispatch(WSActions.send(['order.cancel', authToken, exID, symbol, id]))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(AtomicOrdersTable)
