import { connect } from 'react-redux'

import { getAllBalances } from '../../redux/selectors/ws'
import { getFilteredBalances } from '../../redux/selectors/ui'

import BalancesTable from './BalancesTable'

const mapStateToProps = (state = {}, { activeFilter }) => ({
  balances: getAllBalances(state),
  filteredBalances: getFilteredBalances(state, activeFilter),
})

export default connect(mapStateToProps)(BalancesTable)
