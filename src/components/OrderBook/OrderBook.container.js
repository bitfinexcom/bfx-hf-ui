import { connect } from 'react-redux'

import { getOrderBook } from '../../redux/selectors/ws'
import OrderBook from './OrderBook'

const mapStateToProps = (state = {}, ownProps = {}) => ({
  ob: getOrderBook(state, ownProps.exchange, ownProps.market),
})

export default connect(mapStateToProps)(OrderBook)
