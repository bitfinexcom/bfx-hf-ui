import React from 'react'

import OrderFormModal from '../OrderFormModal'

export default class UnlockAPIKeysModal extends React.PureComponent {
  render () {
    return (
      <OrderFormModal
        className='nohover'
        title='CONNECTING'
        content={(
          <p>Connecting to exchange...</p>
        )}
      />
    )
  }
}
