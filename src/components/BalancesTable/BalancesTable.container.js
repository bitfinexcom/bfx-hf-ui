import { connect } from 'react-redux'

import BalancesTable from './BalancesTable'

const mapStateToProps = (state = {}) => ({
  filteredBalances: state.ui.filteredBalances,
}) // eslint-disable-line
const mapDispatchToProps = dispatch => ({}) // eslint-disable-line

export default connect(mapStateToProps, mapDispatchToProps)(BalancesTable)
