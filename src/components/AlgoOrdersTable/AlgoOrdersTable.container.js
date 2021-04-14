import { connect } from 'react-redux'
import Debug from 'debug'

import { getAlgoOrders, getAPIClientState, getAuthToken } from '../../redux/selectors/ws'
import { getActiveMarket, getActiveExchange } from '../../redux/selectors/ui'
import WSActions from '../../redux/actions/ws'
import GAActions from '../../redux/actions/google_analytics'
import AlgoOrdersTable from './AlgoOrdersTable'

const debug = Debug('hfui:c:algo-orders-table')

const mapStateToProps = (state = {}, ownProps = {}) => {
  const { exID } = ownProps
  const { filteredAO = [] } = state.ui
  const activeExchange = getActiveExchange(state)
  const activeMarket = getActiveMarket(state)

  return {
    apiClientState: getAPIClientState(state, exID),
    authToken: getAuthToken(state),
    algoOrders: getAlgoOrders(state),
    activeExchange,
    activeMarket,
    filteredAO,
  }
}

const mapDispatchToProps = dispatch => ({
  cancelOrder: (authToken, order) => {
    const { gid, exID } = order

    debug('cancelling algo order %d', +gid)
    dispatch(WSActions.send(['algo_order.cancel', authToken, exID, `${gid}`]))
    dispatch(GAActions.cancelAO())
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(AlgoOrdersTable)
