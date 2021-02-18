import React, { useState } from 'react'
import PropTypes from 'prop-types'
import _isEqual from 'lodash/isEqual'
import _isEmpty from 'lodash/isEmpty'

import Modal from '../../ui/Modal'
import Button from '../../ui/Button'

import AlgoOrdersTable from './ActiveAlgoOrdersModal.table'

import './style.css'

const ActiveAlgoOrdersModal = ({
  onClose,
  activeAlgoOrders,
  handleActiveOrders,
}) => {
  const [selectedOrders, setSelectedOrders] = useState([])

  const onOrderSelect = (e, gid, algoID) => {
    if (e) {
      setSelectedOrders([...selectedOrders, { gid, algoID }])
    } else {
      setSelectedOrders([...(selectedOrders.filter(order => gid !== order.gid))])
    }
  }

  const onAllOrdersSelect = (e) => {
    let allOrders = []
    if (e) {
      activeAlgoOrders.forEach(order => {
        const { gid, algoID } = order
        allOrders.push({ gid, algoID })
      })
    } else {
      allOrders = []
    }
    setSelectedOrders(allOrders)
  }

  const isOrderSelected = (gid) => {
    const gids = []
    selectedOrders.forEach(order => gids.push(order.gid))
    return gids.includes(gid)
  }

  const isAllOrdersSelected = () => {
    const allOrders = []
    activeAlgoOrders.forEach(order => {
      const { gid, algoID } = order
      allOrders.push({ gid, algoID })
    })
    return _isEqual(allOrders, selectedOrders)
  }

  const onSubmit = (type) => {
    handleActiveOrders(type, selectedOrders)
  }

  return (
    <Modal
      onClose={onClose}
      label='Active Orders'
      className='hfui-active-ao-modal__wrapper'
      actions={[(
        <Button
          green
          key='orders_cancel'
          onClick={() => onSubmit('algo_order.remove')}
          disabled={_isEmpty(selectedOrders)}
          className='hfui-active-ao-modal-btn mr-10'
          label={[
            <p key='text'>Cancel Orders</p>,
          ]}
        />
      ), (
        <Button
          green
          key='orders_resume'
          onClick={() => onSubmit('algo_order.load')}
          disabled={_isEmpty(selectedOrders)}
          className='hfui-active-ao-modal-btn'
          label={[
            <p key='text'>Resume</p>,
          ]}
        />
      ),
      ]}
    >
      <AlgoOrdersTable
        orders={activeAlgoOrders}
        onOrderSelect={onOrderSelect}
        onAllOrdersSelect={onAllOrdersSelect}
        isOrderSelected={isOrderSelected}
        isAllOrdersSelected={isAllOrdersSelected}
      />
    </Modal>
  )
}

ActiveAlgoOrdersModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  handleActiveOrders: PropTypes.func.isRequired,
  activeAlgoOrders: PropTypes.arrayOf(PropTypes.object),
}

ActiveAlgoOrdersModal.defaultProps = {
  activeAlgoOrders: [],
}

export default React.memo(ActiveAlgoOrdersModal)
