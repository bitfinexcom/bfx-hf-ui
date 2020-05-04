import { connect } from 'react-redux'
import Debug from 'debug'

import { getAPIClientState, getAuthToken } from '../../redux/selectors/ws'
import WSActions from '../../redux/actions/ws'
import AlgoOrdersTable from './AlgoOrdersTable'

const debug = Debug('hfui:c:algo-orders-table')

const mapStateToProps = (state = {}, ownProps = {}) => {
  const { exID } = ownProps
  const { meta = {}, ui = {} } = state
  const { settings = {}} = ui
  const { ReactGA  = {} } = meta
  const { ga } = settings

  return {
    apiClientState: getAPIClientState(state, exID),
    authToken: getAuthToken(state),
    ReactGA,
    ga
  }
}

const mapDispatchToProps = dispatch => ({
  cancelOrder: (authToken, order) => {
    const { gid, exID } = order

    debug('cancelling algo order %d', +gid)
     dispatch(WSActions.send(['algo_order.cancel', authToken, exID, `${gid}`]))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(AlgoOrdersTable)
