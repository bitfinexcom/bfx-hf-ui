/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import _values from 'lodash/values'
import _isFunction from 'lodash/isFunction'
import cx from 'classnames'

import Modal from '../../ui/Modal'
import GeneralTab from './AppSettingsModal.General'
import ApiKeysTab from './AppSettingsModal.ApiKeys'
import TradingModeTab from './AppSettingsModal.TradingMode'

import './style.css'

const Tabs = {
  General: 'General',
  Keys: 'API keys',
  TradingMode: 'Trading mode',
}

const defaultTab = Tabs.General

const AppSettingsModal = ({
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab)

  const onSettingsClose = (callback) => {
    onClose()

    // reset to default tab, but wait for transition out
    setTimeout(() => {
      setActiveTab(defaultTab)

      if (_isFunction(callback)) {
        callback()
      }
    }, 200)
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onSettingsClose}
      label='Settings'
      className='appsettings-modal'
      width={640}
      textAlign='center'
    >
      <div className='appsettings-modal__tabs'>
        {_values(Tabs).map(tab => (
          <div
            key={tab}
            className={cx('appsettings-modal__tab', {
              'is-active': tab === activeTab,
            })}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </div>
        ))}
      </div>
      <div className='appsettings-modal__content'>
        {activeTab === Tabs.General && <GeneralTab />}
        {activeTab === Tabs.Keys && <ApiKeysTab />}
        {activeTab === Tabs.TradingMode && <TradingModeTab onClose={onSettingsClose} />}
      </div>
    </Modal>
  )
}

export default AppSettingsModal
