import React from 'react'
import ReactMarkdown from 'react-markdown'
import Scrollbars from '../../../ui/Scrollbars'
import { propTypes, defaultProps } from './StrategyEditorHelp.props'
import './style.css'

export default class StrategyEditorHelp extends React.PureComponent {
  static propTypes = propTypes
  static defaultProps = defaultProps

  render() {
    const { source } = this.props

    return (
      <div className='dtc-strategyeditor__help'>
        <Scrollbars>
          <div className='dtc-strategyeditor__help-inner'>
            <ReactMarkdown
              source={source}
            />
          </div>
        </Scrollbars>
      </div>
    )
  }
}
