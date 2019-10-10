import { connect } from 'react-redux'
import Debug from 'debug'

import { getAPIClientState } from '../../redux/selectors/ws'
import WSActions from '../../redux/actions/ws'
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
    dispatch(WSActions.send(['algo_order.cancel', exID, `${gid}`]))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(AlgoOrdersTable)
