import WSActions from '../../actions/ws'
import UIActions from '../../actions/ui'

export default (alias, store) => () => {
  store.dispatch(UIActions.changeBadInternetConnectionState(true))
  store.dispatch(WSActions.disconnected(alias))
}
