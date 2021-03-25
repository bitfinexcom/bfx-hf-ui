import { connect } from 'react-redux'

import { getStrategies, getAuthToken } from '../../redux/selectors/ws'
import OpenExistingStrategyModal from './OpenExistingStrategyModal'

const mapStateToProps = (state = {}) => ({
  strategies: getStrategies(state),
  authToken: getAuthToken(state),
})

export default connect(mapStateToProps)(OpenExistingStrategyModal)
