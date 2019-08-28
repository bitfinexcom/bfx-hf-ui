import WSHFActions from '../../actions/ws_hf_server'

export default (ws, store) => (e) => {
  store.dispatch(WSHFActions.disconnected())
}
