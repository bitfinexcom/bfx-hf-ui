import { connect } from 'react-redux'

import { getAllPositions } from '../../redux/selectors/ws'
import PositionsTablePanel from './PositionsTablePanel'

const mapStateToProps = (state = {}) => ({
  positions: getAllPositions(state),
})

export default connect(mapStateToProps)(PositionsTablePanel)
