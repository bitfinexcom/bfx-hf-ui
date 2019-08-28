import WSDTCActions from '../../actions/ws_dtc_server'

export default (ws, store) => (e) => {
  store.dispatch(WSDTCActions.disconnected())
}
