import React from 'react'
import PropTypes from 'prop-types'

import Panel from '../../../ui/Panel'
import Modal from '../../../ui/Modal'
import Input from '../../../ui/Input'
import Button from '../../../ui/Button'

export default class StrategyEditorPanel extends React.PureComponent {
  static propTypes = {
    dark: PropTypes.bool,
    moveable: PropTypes.bool,
    removeable: PropTypes.bool,
    execRunning: PropTypes.bool,
    strategyId: PropTypes.string,
    strategyDirty: PropTypes.bool,
    strategyLabel: PropTypes.string,
    isRemoveModalOpened: PropTypes.bool,
    onRemove: PropTypes.func.isRequired,
    strategy: PropTypes.objectOf(Object),
    onCloseModals: PropTypes.func.isRequired,
    onSaveStrategy: PropTypes.func.isRequired,
    onRemoveStrategy: PropTypes.func.isRequired,
    onOpenSelectModal: PropTypes.func.isRequired,
    onOpenCreateModal: PropTypes.func.isRequired,
    onOpenRemoveModal: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
  }
  static defaultProps = {
    dark: true,
    strategyId: '',
    strategy: {},
    moveable: true,
    removeable: true,
    strategyLabel: '',
    execRunning: false,
    strategyDirty: false,
    isRemoveModalOpened: false,
  }

  state = {
    canDeleteStrategy: false,
  }

  validateInput = (text) => {
    const { strategy, strategyLabel } = this.props
    const { label = strategyLabel } = strategy || {}
    if (text === label) {
      this.setState(() => ({ canDeleteStrategy: true }))
    } else {
      this.setState(() => ({ canDeleteStrategy: false }))
    }
  }

  removeStrategy = () => {
    const { onRemoveStrategy } = this.props
    onRemoveStrategy()
    this.setState(() => ({ canDeleteStrategy: false }))
  }

  render() {
    const {
      dark,
      strategy,
      onRemove,
      moveable,
      children,
      strategyId,
      removeable,
      execRunning,
      strategyDirty,
      onCloseModals,
      onSaveStrategy,
      onOpenSelectModal,
      onOpenCreateModal,
      onOpenRemoveModal,
      isRemoveModalOpened,
    } = this.props
    const { canDeleteStrategy } = this.state
    const { id = strategyId, label: strategyName } = strategy || {}

    return (
      <Panel
        label='STRATEGY EDITOR'
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
        )}
      >
        <Modal
          isOpen={isRemoveModalOpened}
          onClose={onCloseModals}
          className='hfui-removestrategymodal__wrapper'
          label='Remove Strategy'
          actions={([
            <Button
              key='cancel'
              dark
              onClick={onCloseModals}
              label={[
                <p key='text'>Cancel</p>,
              ]}
            />,
            <Button
              key='delete'
              green
              disabled={!canDeleteStrategy}
              onClick={this.removeStrategy}
              label={[
                <p key='text'>Delete</p>,
              ]}
            />,
          ])}
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
            <Input type='text' onChange={this.validateInput} placeholder={`Type "${strategyName}" to delete`} />
          </div>
        </Modal>
        {children}
      </Panel>
    )
  }
}
