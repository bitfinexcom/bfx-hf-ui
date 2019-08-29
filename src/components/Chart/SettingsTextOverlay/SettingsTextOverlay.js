import React from 'react'
import { propTypes, defaultProps } from './SettingsTextOverlay.props'

export default class SettingsTextOverlay extends React.PureComponent {
  static propTypes = propTypes
  static defaultProps = defaultProps

  render() {
    const {
      onClick, forLabel = '', color = '#fcd206', positionY, chartWidth, right,
    } = this.props

    const y = 15 + (positionY * 20)
    const x = right
      ? chartWidth - (220 + (forLabel.length * 5.5))
      : -20

    return (
      <g>
        <g
          transform={`translate(${x}, ${y})`}
          className='hfui-chart__settings-text-overlay'
        >
          <text
            fontFamily='Helvetica Neue, Helvetica, Arial, sans-serif'
            fontSize='11'
            onClick={onClick}
            x='0'
            y='0'
          >
            <tspan fill={color}>
              Settings
              {' '}
              {forLabel}
            </tspan>
          </text>
        </g>
      </g>
    )
  }
}
