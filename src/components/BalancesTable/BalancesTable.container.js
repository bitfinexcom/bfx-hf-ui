import { connect } from 'react-redux'

import BalancesTable from './BalancesTable'

const mapStateToProps = (state = {}) => ({
  lang: state.ui.lang,
}) // eslint-disable-line
const mapDispatchToProps = dispatch => ({}) // eslint-disable-line

export default connect(mapStateToProps, mapDispatchToProps)(BalancesTable)
