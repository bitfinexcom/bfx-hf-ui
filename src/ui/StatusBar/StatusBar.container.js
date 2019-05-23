import { connect } from 'react-redux'
import StatusBar from './StatusBar'

const mapStateToProps = (state = {}, ownProps = {}) => {
  const { data = {} } = state
  const { candles = {} } = data
  const { syncs = {} } = candles

  return { syncs }
}

const mapDispatchToProps = dispatch => ({
  dispatch,
})

export default connect(mapStateToProps, mapDispatchToProps)(StatusBar)
