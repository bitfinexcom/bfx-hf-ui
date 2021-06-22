import { connect } from 'react-redux'

import { getAllBalances, getFilteredBalances } from '../../redux/selectors/ws'

import BalancesTable from './BalancesTable'

const mapStateToProps = (state = {}, { activeFilter }) => ({
  balances: getAllBalances(state),
  filteredBalances: getFilteredBalances(state, activeFilter),
})

export default connect(mapStateToProps)(BalancesTable)
