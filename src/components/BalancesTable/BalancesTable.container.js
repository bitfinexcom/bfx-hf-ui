import { connect } from 'react-redux'

import BalancesTable from './BalancesTable'

const mapStateToProps = (state = {}) => ({
  filtredBalances: state.ui.filtredBalances,
}) // eslint-disable-line
const mapDispatchToProps = dispatch => ({}) // eslint-disable-line

export default connect(mapStateToProps, mapDispatchToProps)(BalancesTable)
