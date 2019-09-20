import { connect } from 'react-redux'

import { getAllCandles } from '../../redux/selectors/ws'
import { getActiveMarket, getActiveExchange } from '../../redux/selectors/ui'
import StrategyEditor from './StrategyEditor'

const mapStateToProps = (state = {}) => ({
  activeExchange: getActiveExchange(state),
  activeMarket: getActiveMarket(state),
  candleData: getAllCandles(state),
})

const mapDispatchToProps = dispatch => ({}) // eslint-disable-line

export default connect(mapStateToProps, mapDispatchToProps)(StrategyEditor)
