import { connect } from 'react-redux'

import { getStrategies, getAuthToken } from '../../redux/selectors/ws'
import OpenExistingStrategyModal from './OpenExistingStrategyModal'

const mapStateToProps = (state = {}) => ({
  strategies: getStrategies(state),
  authToken: getAuthToken(state),
})

const mapDispatchToProps = dispatch => ({}) // eslint-disable-line

export default connect(mapStateToProps, mapDispatchToProps)(OpenExistingStrategyModal)
