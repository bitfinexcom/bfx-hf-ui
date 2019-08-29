import React from 'react'

import OrderFormModal from '../../OrderFormModal'
import { propTypes, defaultProps } from './LockedModal.props'

export default class UnlockAPIKeysModal extends React.PureComponent {
  static propTypes = propTypes
  static defaultProps = defaultProps

  render() {
    const { onClick } = this.props

    return (
      <OrderFormModal
        title='LOCKED'
        icon='fas fa-lock'
        onClick={onClick}
        content={(
          <p className='underline'>Enter password to decrypt API keys</p>
        )}
      />
    )
  }
}
