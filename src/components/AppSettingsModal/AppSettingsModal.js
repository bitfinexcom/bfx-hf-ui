import React, { useState, useEffect } from 'react'
import _values from 'lodash/values'
import cx from 'classnames'

import Modal from '../../ui/Modal'
import APIKeysSection from '../../pages/Settings/APIKeysSection'
import DeadMenSwitch from '../../pages/Settings/DeadMenSwitch'
import CheckboxesSections from '../../pages/Settings/CheckboxesSections'

import './style.css'

const Tabs = {
  General: 'General',
  Keys: 'API keys',
  Trading: 'Trading mode',
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
      className='appsettings-modal hfui-settingspage2__wrapper'
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
      <div className='appsettings-modal__content hfui-settings2__content'>
        {activeTab === Tabs.General && (
          <>
            <DeadMenSwitch
              onOptionChange={setStateDMS}
              checked={Boolean(stateDMS)}
            />

            <CheckboxesSections
              onOptionChange={setStateGA}
              gaChecked={Boolean(stateGA)}
              autologinChecked={false}
              updateAutoLoginState={() => {}}
            />

            <div className='hfui-settings__option'>
              <Modal.Button>
                Save
              </Modal.Button>
            </div>
          </>
        )}
        {activeTab === Tabs.Keys && (
          <>
            <APIKeysSection
              setApiKey={() => {}}
              apiKey=''
              setApiSecret={() => {}}
              apiSecret=''
              setPaperApiKey={() => {}}
              paperApiKey=''
              setPaperApiSecret={() => {}}
              paperApiSecret=''
            />
            <Modal.Button>
              Save
            </Modal.Button>
          </>
        )}
      </div>
    </Modal>
  )
}

export default AppSettingsModal
