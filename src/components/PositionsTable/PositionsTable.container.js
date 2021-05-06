import { connect } from 'react-redux'
import { prepareAmount } from 'bfx-api-node-util'
import Debug from 'debug'

import { getAuthToken, getAllPositions } from '../../redux/selectors/ws'
import orders from '../../orders'
import WSActions from '../../redux/actions/ws'
import UIActions from '../../redux/actions/ui'
import PositionsTable from './PositionsTable'

const debug = Debug('hfui:c:positions-table')

const mapStateToProps = (state = {}) => ({
  authToken: getAuthToken(state),
  positions: getAllPositions(state),
})

const mapDispatchToProps = dispatch => ({
  closePosition: (authToken, position = {}) => {
    const { symbol, amount, basePrice } = position
    const { generateOrder } = orders.Market()

    const packet = generateOrder({
      amount: prepareAmount(-1 * amount),
      reduceonly: true,
    }, symbol, 'm')

    debug('closing position on %s %f @ %f', symbol, amount, basePrice)
    dispatch(WSActions.send(['order.submit', authToken, 'bitfinex', packet]))
  },
  setFilteredValueWithKey: (key, value) => {
    dispatch(UIActions.setFilteredValueWithKey(key, value))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(PositionsTable)
