import { connect } from 'react-redux'

import AlgoOrderActions from '../../redux/actions/algo-orders'
import EditorActions from '../../redux/actions/editor'

import AlgoOrderTableView from './AlgoOrderTable'

const mapStateToProps = (state = {}, ownProps = {}) => {
  const { orders = [] } = ownProps
  const { algoOrders = [] } = state.algoOrders
  const { editorOpened = false } = state.editor
  return {
    algoOrders,
    orders,
    editorOpened,
  }
}

const mapDispatchToProps = dispatch => ({
  changeStatus: (id, isActive) => {
    dispatch(AlgoOrderActions.changeStatus(id, isActive))
  },
  toggleEditor: (flag) => {
    dispatch(EditorActions.toggleEditor(flag))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(AlgoOrderTableView)
