import React, { memo } from 'react'
import PropTypes from 'prop-types'

import OrderFormModal from '../../OrderFormModal'

const UnconfiguredModal = ({ onClick, isPaperTrading }) => (
  <OrderFormModal
    title='NOT CONFIGURED'
    titleColor='#f05359'
    icon='icon-api'
    onClick={onClick}
    content={[
      <p key='a' className='underline'>
        Submit
        {isPaperTrading ? ' Paper Trading ' : ' '}
        API keys
      </p>,
    ]}
  />
)

UnconfiguredModal.propTypes = {
  onClick: PropTypes.func.isRequired,
  isPaperTrading: PropTypes.bool.isRequired,
}

export default memo(UnconfiguredModal)
