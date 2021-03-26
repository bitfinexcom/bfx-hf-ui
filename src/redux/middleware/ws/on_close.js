import WSActions from '../../actions/ws'

export default (alias, store) => () => {
  store.dispatch(WSActions.disconnected(alias))
}
