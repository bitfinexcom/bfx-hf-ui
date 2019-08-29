import { connect } from 'react-redux'
import Debug from 'debug'

import { getAPIClientState } from '../../redux/selectors/ws_dtc_server'
import WSDTCActions from '../../redux/actions/ws_dtc_server'
import AlgoOrdersTable from './AlgoOrdersTable'

const debug = Debug('hfui:c:algo-orders-table')

const mapStateToProps = (state = {}, ownProps = {}) => {
  const { exID } = ownProps

  return {
    apiClientState: getAPIClientState(state, exID),
  }
}

const mapDispatchToProps = dispatch => ({
  cancelOrder: (order) => {
    const { gid, exID } = order

    debug('cancelling algo order %d', +gid)
    dispatch(WSDTCActions.send(['algo_order.cancel', exID, `${gid}`]))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(AlgoOrdersTable)
