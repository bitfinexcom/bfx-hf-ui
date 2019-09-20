import WSActions from '../../actions/ws'

export default (ws, store) => () => {
  store.dispatch(WSActions.connected())
}
