import { connect } from 'react-redux'
import { prepareAmount } from 'bfx-api-node-util'
import Debug from 'debug'

import BFXOrders from '../../orders/bitfinex'
import WSDTCActions from '../../redux/actions/ws_dtc_server'
import PositionsTable from './PositionsTable'

const debug = Debug('hfui:c:positions-table')

const mapStateToProps = (state = {}, ownProps = {}) => ({}) // eslint-disable-line

const mapDispatchToProps = dispatch => ({
  closePosition: (exID, position = {}) => {
    switch (exID) {
      case 'bitfinex': {
        const { symbol, amount, basePrice } = position
        const { generateOrder } = BFXOrders.Market()

        const packet = generateOrder({
          amount: prepareAmount(-1 * amount),
        }, symbol, 'm')

        debug('closing position on %s %f @ %f', symbol, amount, basePrice)
        dispatch(WSDTCActions.send(['order.submit', exID, packet]))
        break
      }

      default: {
        debug('closePosition unimplemented for %s', exID)
      }
    }
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(PositionsTable)
