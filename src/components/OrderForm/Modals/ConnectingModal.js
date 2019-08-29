import React from 'react'

import OrderFormModal from '../OrderFormModal'

export default class ConnectingModal extends React.PureComponent {
  render() {
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
