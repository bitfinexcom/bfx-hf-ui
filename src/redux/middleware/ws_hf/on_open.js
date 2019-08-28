import WSHFActions from '../../actions/ws_hf_server'

export default (ws, store) => (e) => {
  setTimeout(() => {
    store.dispatch(WSHFActions.connected())
  }, 0)
}
