import React from 'react'

// {(showSave) && (
//   <div className='hfui-exchangeinfobar__right' onClick={onSave}>
//     <i className='icon-save' />
//   </div>
// )}

// {(showAddComponent) && (
//   <div className='hfui-exchangeinfobar__right' onClick={onAddComponent}>
//     <i className='icon-plus' />
//   </div>
// )}

// {(showNotifications) && (
//   <div className='hfui-exchangeinfobar__right' onClick={openNotifications}>
//     <i className='icon-notifications' />
//   </div>
// )}

export default function ExchangeInfoBarButton({ icon, ...props }) {
  return (
    <button type='button' className='hfui-exchangeinfobar__button' {...props}>
      <i className={`icon-${icon}`} />
    </button>
  )
}
