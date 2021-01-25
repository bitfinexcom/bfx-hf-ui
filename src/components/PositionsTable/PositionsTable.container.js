import { connect } from 'react-redux'
import { prepareAmount } from 'bfx-api-node-util'
import Debug from 'debug'

import { getAuthToken } from '../../redux/selectors/ws'
import BFXOrders from '../../orders/bitfinex'
import WSActions from '../../redux/actions/ws'
import UIActions from '../../redux/actions/ui'
import PositionsTable from './PositionsTable'

const debug = Debug('hfui:c:positions-table')

const mapStateToProps = (state = {}, ownProps = {}) => ({ // eslint-disable-line
  authToken: getAuthToken(state),
  positions: state.ws.positions,
})

const mapDispatchToProps = dispatch => ({
  closePosition: (exID, authToken, position = {}) => {
    switch (exID) {
      case 'bitfinex': {
        const { symbol, amount, basePrice } = position
        const { generateOrder } = BFXOrders.Market()

        const packet = generateOrder({
          amount: prepareAmount(-1 * amount),
          reduceonly: true,
        }, symbol, 'm')

        debug('closing position on %s %f @ %f', symbol, amount, basePrice)
        console.log(packet)
        dispatch(WSActions.send(['order.submit', authToken, exID, packet]))
        break
      }

      default: {
        debug('closePosition unimplemented for %s', exID)
      }
    }
  },
  setFilteredValueWithKey: (key, value) => {
    dispatch(UIActions.setFilteredValueWithKey(key, value))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(PositionsTable)
