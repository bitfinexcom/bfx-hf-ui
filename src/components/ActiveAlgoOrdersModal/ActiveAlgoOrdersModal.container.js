import { connect } from 'react-redux'

import { handleActiveOrders } from '../../redux/actions/ao'
import { getActiveAlgoOrders } from '../../redux/selectors/ao'

import ActiveAlgoOrdersModal from './ActiveAlgoOrdersModal'

const mapStateToProps = (state = {}) => ({
  activeAlgoOrders: getActiveAlgoOrders(state),
})

const mapDispatchToProps = dispatch => ({
  handleActiveOrders: data => dispatch(handleActiveOrders(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ActiveAlgoOrdersModal)
