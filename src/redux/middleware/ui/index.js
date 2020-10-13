import UIActions from '../../actions/ui'
import UITypes from '../../constants/ui'

export default () => {
  return store => next => (action = {}) => {
    const { type } = action

    switch (type) {
      case UITypes.SAVE_LAYOUT: {
        store.dispatch(UIActions.recvNotification({
          mts: Date.now(),
          status: 'success',
          text: 'Successfully saved layout',
        }))
        next(action)
        break
      }
      default: {
        next(action)
        break
      }
    }
  }
}
