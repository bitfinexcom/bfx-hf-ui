import { connect } from 'react-redux'

import AlgoOrderActions from '../../redux/actions/algo-orders'
import EditorActions from '../../redux/actions/editor'

import AlgoOrderDefinitionsTableView from './AlgoOrderDefinitionsTable'

const mapStateToProps = (state = {}) => {
  const { algoOrders = [], orders = [] } = state.algoOrders
  const { editorOpened = false } = state.editor
  return {
    algoOrders,
    orders,
    editorOpened,
  }
}

const mapDispatchToProps = dispatch => ({
  changeStatus: (index) => {
    dispatch(AlgoOrderActions.changeStatus(index))
  },
  toggleEditor: (flag) => {
    dispatch(EditorActions.toggleEditor(flag))
  },
  stopOrder: (gId) => {
    dispatch(AlgoOrderActions.stopOrder(gId))
  },
  runOrder: (gId) => {
    dispatch(AlgoOrderActions.runOrder(gId))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(AlgoOrderDefinitionsTableView)
