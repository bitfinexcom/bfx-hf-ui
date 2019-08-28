import React from 'react'
import ClassNames from 'classnames'
import ReactTooltip from 'react-tooltip'

export default class FeatureLabel extends React.PureComponent {
  render () {
    const { id, label, tooltip, dev } = this.props

    return [
      <li
        className={ClassNames({ dev })}
        key='item'
        data-tip
        data-place='right'
        data-for={id}
      >{label}</li>,

      <ReactTooltip
        key='item-tooltip'
        effect='solid'
        id={id}
      >{tooltip}</ReactTooltip>
    ]
  }
}
