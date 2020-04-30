import React from 'react'
import Scrollbars from '../../../ui/Scrollbars'
import { propTypes, defaultProps } from './StrategyEditorHelp.props'
import './style.css'

export default class StrategyEditorHelp extends React.PureComponent {
  static propTypes = propTypes
  static defaultProps = defaultProps

  render() {
    // const { source } = this.props

    return (
      <div className='hfui-strategyeditor__help'>
        <Scrollbars>
          <div className='hfui-strategyeditor__help-inner'>
            {/* <ReactMarkdown
              source={source}
            /> */}
          </div>
        </Scrollbars>
      </div>
    )
  }
}
