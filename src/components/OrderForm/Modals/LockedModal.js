import React from 'react'

import OrderFormModal from '../OrderFormModal'

export default class UnlockAPIKeysModal extends React.PureComponent {
  render () {
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
