import React from 'react'
import _capitalize from 'lodash/capitalize'

import OrderFormModal from '../../OrderFormModal'
import { propTypes, defaultProps } from './TradingComingSoonModal.props'

export default class TradingComingSoonModal extends React.PureComponent {
  static propTypes = propTypes
  static defaultProps = defaultProps

  render() {
    const { exID } = this.props

    return (
      <OrderFormModal
        title='COMING SOON'
        icon='fab fa-dev'
        content={(
          <p className='underline'>
            Trading is in development for
            {_capitalize(exID)}
          </p>
        )}
      />
    )
  }
}
