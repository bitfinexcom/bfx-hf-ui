import { connect } from 'react-redux'
import BTHistoricalView from './BTHistoricalView'
import DataActions from '../../../redux/actions/data'
import getBTs from '../../../redux/selectors/bts'

const mapStateToProps = (state = {}) => {
  const bts = getBTs(state)

  return {
    bts,
  }
}

const mapDispatchToProps = dispatch => ({
  getBTs: () => {
    dispatch(DataActions.getBTs())
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(BTHistoricalView)
