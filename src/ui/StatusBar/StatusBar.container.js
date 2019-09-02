import { connect } from 'react-redux'
import axios from 'axios'
import StatusBar from './StatusBar'
import { lastAppVersion } from '../../redux/actions/app-data'

const mapStateToProps = (state = {}, ownProps = {}) => {
  const { dataHF = {}, socketHF = {}, appData = {} } = state
  const { candles = {} } = dataHF
  const { syncs = {} } = candles
  const { status = '' } = socketHF
  const { version = ''} = appData
  return { syncs, status, version }
}

const mapDispatchToProps = dispatch => ({
  dispatch,
})

export default connect(mapStateToProps, mapDispatchToProps)(StatusBar)
