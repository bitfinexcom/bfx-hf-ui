import { connect } from 'react-redux'

import { getFilteredBalances } from '../../redux/selectors/ui'

import BalancesTable from './BalancesTable'

const mapStateToProps = (state = {}) => ({
  balances: getFilteredBalances(state),
})

export default connect(mapStateToProps)(BalancesTable)
