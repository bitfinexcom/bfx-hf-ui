import React from 'react'

import Button from '../../../ui/Button'
import Panel from '../../../ui/Panel'

import { propTypes, defaultProps } from './StrategyEditorPanel.props'

export default class StrategyEditorPanel extends React.PureComponent {
  static propTypes = propTypes
  static defaultProps = defaultProps

  render() {
    const {
      onRemove, moveable, removeable, children, execRunning,
      strategyDirty, strategy, onOpenSelectModal,
      onOpenCreateModal, onSaveStrategy, dark,
      // onSwitchEditorMode, onToggleMaximiseEditor, editorMode,
      // editorMaximised,
    } = this.props

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
              onClick={onOpenSelectModal}
              label={[
                <i key='icon' className='icon-open' />,
                <p key='text'>Open</p>,
              ]}
            />

            <Button
              green
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

            {/*
              <div
                key='mode'
                className='mode-button'
                onClick={() => onSwitchEditorMode(editorMode === 'code'
                  ? 'visual'
                  : 'code'
                )}
              >
                <p>Switch to {_capitalize(editorMode === 'code' ? 'visual' : 'code')} view</p>
              </div>,
              */

              /*
              <div
                key='maximise'
                onClick={onToggleMaximiseEditor}
                className={ClassNames('maximize-button', {
                  yellow: editorMaximised,
                })}
              >
                {editorMaximised ? [
                  <i key='icon' className='far fa-window-minimize' />,
                  <p key='label'>Minimize Editor</p>
                ] : [
                  <i key='icon' className='far fa-window-maximize' />,
                  <p key='label'>Maximize Editor</p>
                ]}
              </div>
            */}
          </div>
        )}
      >
        {children}
      </Panel>
    )
  }
}
