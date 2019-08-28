import { connect } from 'react-redux'

import { getStrategies, getUser } from '../../redux/selectors/ws_dtc_server'

import OpenExistingStrategyModal from './OpenExistingStrategyModal'

const mapStateToProps = (state = {}, ownProps = {}) => ({
  strategies: getStrategies(state),
  user: getUser(state),
})

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(OpenExistingStrategyModal)
