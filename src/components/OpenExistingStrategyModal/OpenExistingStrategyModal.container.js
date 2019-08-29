import { connect } from 'react-redux'

import { getStrategies, getUser } from '../../redux/selectors/ws_dtc_server'

import OpenExistingStrategyModal from './OpenExistingStrategyModal'

const mapStateToProps = (state = {}) => ({
  strategies: getStrategies(state),
  user: getUser(state),
})

const mapDispatchToProps = dispatch => ({}) // eslint-disable-line

export default connect(mapStateToProps, mapDispatchToProps)(OpenExistingStrategyModal)
