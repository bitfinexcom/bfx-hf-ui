import React from 'react'

export default function ExchangeInfoBarButton({ icon, ...props }) {
  return (
    <button type='button' className='hfui-exchangeinfobar__button' {...props}>
      <i className={`icon-${icon}`} />
    </button>
  )
}
