import React from 'react'

import Button from '../../../ui/Button'
import Panel from '../../../ui/Panel'
import Modal from '../../../ui/Modal'
import Input from '../../../ui/Input'

import { propTypes, defaultProps } from './StrategyEditorPanel.props'

export default class StrategyEditorPanel extends React.PureComponent {
  static propTypes = propTypes
  static defaultProps = defaultProps
  state = {
    canDeleteStrategy: false,
  }
  constructor(props) {
    super(props)
    this.validateInput = this.validateInput.bind(this)
  }
  validateInput(text) {
    const { strategy, strategyLabel } = this.props
    const { label = strategyLabel } = strategy || {}
    if (text === label) {
      this.setState(() => ({ canDeleteStrategy: true }))
    } else {
      this.setState(() => ({ canDeleteStrategy: false }))
    }
  }
  render() {
    const {
      onRemove, moveable, removeable, children, execRunning,
      strategyDirty, strategy = {}, onOpenSelectModal,
      onOpenCreateModal, onSaveStrategy, onRemoveStrategy, dark,
      strategyId, isRemoveModalOpened, onOpenRemoveModal,
      onCloseModals,
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
        { isRemoveModalOpened && (
          <Modal
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
                onClick={onRemoveStrategy}
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
        )}
        {children}
      </Panel>
    )
  }
}
