import { connect } from 'react-redux'

import {
  getActiveMarket, getActiveExchange,
} from '../../redux/selectors/ui'

import ChartPanel from './ChartPanel'

const mapStateToProps = (state = {}) => {
  const activeExchange = getActiveExchange(state)
  const activeMarket = getActiveMarket(state)

  return {
    activeExchange,
    activeMarket,
  }
}

const mapDispatchToProps = dispatch => ({ }) //eslint-disable-line

export default connect(mapStateToProps, mapDispatchToProps)(ChartPanel)
