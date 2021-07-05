import React, { useState, useEffect } from 'react'
import _values from 'lodash/values'
import cx from 'classnames'

import Modal from '../../ui/Modal'
import APIKeysSection from '../../pages/Settings/APIKeysSection'
import DeadMenSwitch from '../../pages/Settings/DeadMenSwitch'
import CheckboxesSections from '../../pages/Settings/CheckboxesSections'

import GeneralTab from './AppSettingsModal.General'
import ApiKeysTab from './AppSettingsModal.ApiKeys'
import TradingModeTab from './AppSettingsModal.TradingMode'

import './style.css'

const Tabs = {
  General: 'General',
  Keys: 'API keys',
  TradingMode: 'Trading mode',
}

const AppSettingsModal = ({
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState(Tabs.General)

  const [stateDMS, setStateDMS] = useState(null)
  const [stateGA, setStateGA] = useState(null)

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
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
        {activeTab === Tabs.TradingMode && <TradingModeTab />}
      </div>
    </Modal>
  )
}

export default AppSettingsModal
