import { connect } from 'react-redux'
import OrderHistory from './OrderHistory'

const mapStateToProps = (state = {}) => ({
  orders: state.ws.orderHistory?.orders,
})

export default connect(mapStateToProps)(OrderHistory)
