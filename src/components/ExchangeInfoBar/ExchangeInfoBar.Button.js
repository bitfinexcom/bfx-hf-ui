import React from 'react'
import PropTypes from 'prop-types'

export default function ExchangeInfoBarButton({ icon, ...props }) {
  return (
    <button type='button' className='hfui-exchangeinfobar__button' {...props}>
      <i className={`icon-${icon}`} />
    </button>
  )
}

ExchangeInfoBarButton.propTypes = {
  icon: PropTypes.string.isRequired,
}
