import { connect } from 'react-redux'

import { getAllCandles, getUser } from '../../redux/selectors/ws_dtc_server'
import { getActiveMarket, getActiveExchange } from '../../redux/selectors/ui'
import StrategyEditor from './StrategyEditor'

const mapStateToProps = (state = {}, ownProps = {}) => ({
  activeExchange: getActiveExchange(state),
  activeMarket: getActiveMarket(state),
  candleData: getAllCandles(state),
  user: getUser(state),
})

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(StrategyEditor)
