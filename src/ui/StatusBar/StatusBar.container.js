import { connect } from 'react-redux'
import StatusBar from './StatusBar'

const mapStateToProps = (state = {}, ownProps = {}) => {

  const { dataHF = {}, socketHF = {} } = state
  const { candles = {} } = dataHF
  const { syncs = {} } = candles
  const { status = '' } = socketHF

  return { syncs, status }
}

const mapDispatchToProps = dispatch => ({
  dispatch,
})

export default connect(mapStateToProps, mapDispatchToProps)(StatusBar)
