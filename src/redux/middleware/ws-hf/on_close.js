import WSHFActions from '../../actions/ws-hf-server'

export default (ws, store) => (e) => {
  store.dispatch(WSHFActions.disconnected())
}
