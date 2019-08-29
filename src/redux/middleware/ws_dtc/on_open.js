import WSDTCActions from '../../actions/ws_dtc_server'

export default (ws, store) => () => {
  store.dispatch(WSDTCActions.connected())
}
