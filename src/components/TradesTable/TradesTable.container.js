import { connect } from 'react-redux'

import TradesTable from './TradesTable'
import { getTrades } from '../../redux/selectors/ws'

const mapStateToProps = (state = {}, ownProps = {}) => ({
  trades: getTrades(state, ownProps.exchange, ownProps.market),
  lang: state.ui.lang,
})

const mapDispatchToProps = dispatch => ({}) // eslint-disable-line

export default connect(mapStateToProps, mapDispatchToProps)(TradesTable)
