import { connect } from 'react-redux'

import { getFilteredBalances } from '../../redux/selectors/ui'

import BalancesTable from './BalancesTable'

const mapStateToProps = (state = {}) => ({
  filteredBalances: getFilteredBalances(state),
})

export default connect(mapStateToProps)(BalancesTable)
