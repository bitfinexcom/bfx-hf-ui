import { connect } from 'react-redux'

import { getStrategies } from '../../redux/selectors/ws'
import OpenExistingStrategyModal from './OpenExistingStrategyModal'

const mapStateToProps = (state = {}) => ({
  strategies: getStrategies(state),
})

export default connect(mapStateToProps)(OpenExistingStrategyModal)
