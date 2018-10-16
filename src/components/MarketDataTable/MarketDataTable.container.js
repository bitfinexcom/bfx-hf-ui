import { connect } from 'react-redux'
import MarketDataTable from './MarketDataTable'
import getMarkets from '../../redux/selectors/markets'

const mapStateToProps = (state = {}, ownProps = {}) => {
  const { data = {} } = state
  const availableMarkets = getMarkets(state)

  return {
    availableMarkets
  }
}

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(MarketDataTable)
