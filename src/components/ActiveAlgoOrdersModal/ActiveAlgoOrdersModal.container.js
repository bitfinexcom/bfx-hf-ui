import { connect } from 'react-redux'

import { handleActiveOrders, showActiveOrdersModal } from '../../redux/actions/ao'
import { getActiveAlgoOrders } from '../../redux/selectors/ao'

import ActiveAlgoOrdersModal from './ActiveAlgoOrdersModal'

const mapStateToProps = (state = {}) => ({
  activeAlgoOrders: getActiveAlgoOrders(state),
})

const mapDispatchToProps = dispatch => ({
  showActiveOrdersModal: payload => dispatch(showActiveOrdersModal(payload)),
  handleActiveOrders: data => dispatch(handleActiveOrders(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ActiveAlgoOrdersModal)
