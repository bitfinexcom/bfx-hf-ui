import React from 'react'

export default class SettingsTextOverlay extends React.PureComponent {
  render () {
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
          className='dtc-chart__settings-text-overlay'
        >
          <text
            fontFamily='Helvetica Neue, Helvetica, Arial, sans-serif'
            fontSize='11'
            onClick={onClick}
            x='0'
            y='0'
          >
            <tspan fill={color}>
              Settings {forLabel}
            </tspan>
          </text>
        </g>
      </g>
    )
  }
}
