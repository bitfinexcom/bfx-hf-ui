import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import TableActions from '../../redux/actions/table'


import AlgoOrderTableView from './AlgoOrderTable'

const mapStateToProps = (state = {}, ownProps = {}) => {
  const { orders = [] } = ownProps
  const { algoOrders = [] } = state.table

  return {
    algoOrders,
    orders,
  }
}

const mapDispatchToProps = dispatch => ({
  changeStatus: (index) => {
    dispatch(TableActions.changeStatus(index))
  },
  getTableData: () => {
    dispatch(TableActions.getAlgoData())
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(AlgoOrderTableView)
