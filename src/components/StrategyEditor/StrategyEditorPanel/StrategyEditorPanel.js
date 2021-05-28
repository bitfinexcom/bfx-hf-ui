import React, { useState } from 'react'
import PropTypes from 'prop-types'

import Panel from '../../../ui/Panel'
import Modal from '../../../ui/Modal'
import Input from '../../../ui/Input'
import Button from '../../../ui/Button'

const StrategyEditorPanel = ({
  dark,
  strategy,
  onRemove,
  moveable,
  children,
  strategyId,
  removeable,
  execRunning,
  strategyDirty,
  strategyLabel,
  onCloseModals,
  onSaveStrategy,
  onOpenSelectModal,
  onOpenCreateModal,
  onOpenRemoveModal,
  isRemoveModalOpened,
  onRemoveStrategy,
}) => {
  const [canDeleteStrategy, setCanDeleteStrategy] = useState(false)

  const validateInput = (text) => {
    const { label = strategyLabel } = strategy
    setCanDeleteStrategy(text === label)
  }

  const removeStrategy = () => {
    onRemoveStrategy()
    setCanDeleteStrategy(false)
  }

  const { id = strategyId, label: strategyName } = strategy || {}
  const strategyDisplayName = strategyDirty ? 'Unsaved strategy' : strategyName
  const strategyDisplayLabel = strategyDisplayName ? `- ${strategyDisplayName}` : ''
  return (
    <Panel
      label={`Strategy Editor ${strategyDisplayLabel}`}
      className='hfui-strategyeditor__panel'
      dark={dark}
      darkHeader={dark}
      onRemove={onRemove}
      moveable={moveable}
      removeable={removeable}
      extraIcons={[
        execRunning && (<i key='running' className='fas fa-circle-notch' />),
      ]}
      headerComponents={(
        <div className='hfui-strategyeditor__header'>
          <div className='header__buttons-container'>
            <Button
              className='hfui-open-strategy__btn'
              onClick={onOpenSelectModal}
              label={[
                <i key='icon' className='icon-open' />,
                <p key='text'>Open</p>,
              ]}
            />

            <Button
              green
              className='hfui-create-strategy__btn'
              onClick={onOpenCreateModal}
              label={[
                <i key='icon' className='icon-strategy-editor-passive' />,
                <p key='text'>New Strategy</p>,
              ]}
            />

            {strategy && (
              <Button
                onClick={onSaveStrategy}
                disabled={!strategyDirty}
                label={[
                  <i key='icon' className='icon-save' />,
                  <p key='text'>Save</p>,
                ]}
              />
            )}

            {strategy && (
              <Button
                className='hfui-remove-strategy__btn'
                onClick={onOpenRemoveModal}
                disabled={!id}
                label={[
                  <i key='icon' className='icon-delete1' />,
                  <p key='text'>Remove</p>,
                ]}
              />
            )}
          </div>
        </div>
        )}
    >
      <Modal
        isOpen={isRemoveModalOpened}
        onClose={onCloseModals}
        className='hfui-removestrategymodal__wrapper'
        label='Remove Strategy'
      >
        <div className='hfui-removestrategymodal__content'>
          <p>
            Are you sure you want to delete &nbsp;
            <b>{ strategyName }</b>
                &nbsp; strategy?
          </p>
          <p>
            <b>WARNING: </b>
            <i> This action can not be undone.</i>
          </p>
          <Input type='text' onChange={validateInput} placeholder={`Type "${strategyName}" to delete`} />
        </div>
        <Modal.Footer>
          <Modal.Button
            secondary
            onClick={onCloseModals}
          >
            Cancel
          </Modal.Button>
          <Modal.Button
            primary
            disabled={!canDeleteStrategy}
            onClick={removeStrategy}
          >
            Delete
          </Modal.Button>
        </Modal.Footer>
      </Modal>
      {children}
    </Panel>
  )
}

StrategyEditorPanel.propTypes = {
  dark: PropTypes.bool,
  moveable: PropTypes.bool,
  removeable: PropTypes.bool,
  execRunning: PropTypes.bool,
  strategyId: PropTypes.string,
  strategyDirty: PropTypes.bool,
  strategyLabel: PropTypes.string,
  isRemoveModalOpened: PropTypes.bool,
  onRemove: PropTypes.func.isRequired,
  strategy: PropTypes.shape({
    id: PropTypes.string,
    label: PropTypes.string,
  }),
  onCloseModals: PropTypes.func.isRequired,
  onSaveStrategy: PropTypes.func.isRequired,
  onRemoveStrategy: PropTypes.func.isRequired,
  onOpenSelectModal: PropTypes.func.isRequired,
  onOpenCreateModal: PropTypes.func.isRequired,
  onOpenRemoveModal: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
}

StrategyEditorPanel.defaultProps = {
  dark: true,
  strategyId: '',
  strategy: {
    id: null,
    label: null,
  },
  moveable: true,
  removeable: true,
  strategyLabel: '',
  execRunning: false,
  strategyDirty: false,
  isRemoveModalOpened: false,
}

export default StrategyEditorPanel
