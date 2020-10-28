import { connect } from 'react-redux'

import OrderHistoryTable from './OrderHistoryTable'

const mapStateToProps = (state = {}) => ({
  orderHistory: state.ws.orderHistory.orders,
}) //eslint-disable-line

const mapDispatchToProps = dispatch => ({}) //eslint-disable-line

export default connect(mapStateToProps, mapDispatchToProps)(OrderHistoryTable)
