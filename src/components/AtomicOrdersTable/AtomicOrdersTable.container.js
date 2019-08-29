import { connect } from 'react-redux'
import Debug from 'debug'

import WSDTCActions from '../../redux/actions/ws_dtc_server'

import AtomicOrdersTable from './AtomicOrdersTable'

const debug = Debug('hfui:c:atomic-orders-table')

const mapStateToProps = (state = {}, ownProps = {}) => {} // eslint-disable-line

const mapDispatchToProps = dispatch => ({
  cancelOrder: (exID, order) => {
    const { id, symbol } = order

    debug('cancelling order %d [%s]', id, symbol)
    dispatch(WSDTCActions.send(['order.cancel', exID, symbol, id]))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(AtomicOrdersTable)
