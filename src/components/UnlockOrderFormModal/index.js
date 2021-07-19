import React, { memo } from 'react'

import Modal from '../../ui/Modal'
import './style.css'

const UnlockOrderFormModal = () => (
  <Modal className='hfui-unlockorderformmodal__wrapper'>
    <p>Unlock the Order Form to use this component</p>
  </Modal>
)

export default memo(UnlockOrderFormModal)
