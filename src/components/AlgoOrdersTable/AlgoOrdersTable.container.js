import { connect } from 'react-redux'
import Debug from 'debug'

import { getAPIClientState, getAuthToken } from '../../redux/selectors/ws'
import WSActions from '../../redux/actions/ws'
import GAActions from '../../redux/actions/google_analytics'
import AlgoOrdersTable from './AlgoOrdersTable'

const debug = Debug('hfui:c:algo-orders-table')

const mapStateToProps = (state = {}, ownProps = {}) => {
  const { exID } = ownProps

  return {
    apiClientState: getAPIClientState(state, exID),
    authToken: getAuthToken(state),
    lang: state.ui.lang,
  }
}

const mapDispatchToProps = dispatch => ({
  cancelOrder: (authToken, order) => {
    const { gid, exID } = order

    debug('cancelling algo order %d', +gid)
    dispatch(WSActions.send(['algo_order.cancel', authToken, exID, `${gid}`]))
  },
  gaCancelOrder: () => {
    dispatch(GAActions.cancelAO())
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(AlgoOrdersTable)
