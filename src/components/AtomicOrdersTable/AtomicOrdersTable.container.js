import { connect } from 'react-redux'
import Debug from 'debug'

import WSActions from '../../redux/actions/ws'

import AtomicOrdersTable from './AtomicOrdersTable'

const debug = Debug('hfui:c:atomic-orders-table')

const mapStateToProps = (state = {}, ownProps = {}) => ({}) // eslint-disable-line

const mapDispatchToProps = dispatch => ({
  cancelOrder: (exID, order) => {
    const { id, symbol } = order

    debug('cancelling order %d [%s]', id, symbol)
    dispatch(WSActions.send(['order.cancel', exID, symbol, id]))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(AtomicOrdersTable)
