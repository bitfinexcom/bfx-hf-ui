import React from 'react'
import ClassNames from 'classnames'
import Panel from '../../../ui/Panel'
import { propTypes, defaultProps } from './StrategyEditorPanel.props'

export default class StrategyEditorPanel extends React.PureComponent {
  static propTypes = propTypes
  static defaultProps = defaultProps

  render() {
    const {
      onRemove, moveable, removeable, children, execRunning, helpOpen,
      authenticated, strategyDirty, strategy, onToggleHelp,
      onOpenSelectModal, onOpenCreateModal, onSaveStrategy, onBacktestStrategy,
      // onSwitchEditorMode, onToggleMaximiseEditor, editorMode,
      // editorMaximised,
    } = this.props

    return (
      <Panel
        label='STRATEGY EDITOR'
        className='hfui-strategyeditor__panel'
        onRemove={onRemove}
        moveable={moveable}
        removeable={removeable}
        extraIcons={[
          execRunning && (<i key='running' className='fas fa-circle-notch' />),
          strategy && (
            <i
              key='help'
              className={ClassNames('fas fa-question', {
                yellow: helpOpen,
              })}
              onClick={onToggleHelp}
            />
          ),
        ]}

        headerComponents={(
          <div className='hfui-strategyeditor__header'>
            {authenticated && (
              <i
                className='far fa-folder-open'
                onClick={onOpenSelectModal}
              />
            )}

            <i
              className='far fa-plus-square'
              onClick={onOpenCreateModal}
            />

            {strategy && [
              <div key='label' className='strategy-label'>
                <p>{strategy.label}</p>

                <i
                  key='save'
                  onClick={onSaveStrategy}
                  className={ClassNames('far fa-save', {
                    yellow: strategyDirty,
                  })}
                />
              </div>,

              <div
                key='exec'
                onClick={execRunning ? () => {} : onBacktestStrategy}
                className={ClassNames('exec-button', { disabled: execRunning })}
              >
                <i className='fa fa-play' />
                <p>Run</p>
              </div>,

              /*
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
              */
            ]}
          </div>
        )}
      >
        {children}
      </Panel>
    )
  }
}
