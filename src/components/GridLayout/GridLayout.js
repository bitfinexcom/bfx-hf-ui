import React from 'react'
import { Responsive as RGL, WidthProvider } from 'react-grid-layout'

import { propTypes, defaultProps } from './GridLayout.props'
import { renderLayoutElement } from './GridLayout.helpers'
import './style.css'

const GridLayoutP = WidthProvider(RGL)

export default class GridLayout extends React.PureComponent {
  static propTypes = propTypes
  static defaultProps = defaultProps

  constructor(props) {
    super(props)

    this.onLayoutChange = this.onLayoutChange.bind(this)
  }

  onLayoutChange(layout) {
    const { onLayoutChange } = this.props
    onLayoutChange(layout)
  }

  render() {
    const {
      layoutDef, chartProps, bookProps, tradesProps, orderFormProps, ordersProps,
      onRemoveComponent, layoutID, darkPanels,
    } = this.props

    const componentProps = {
      orderForm: orderFormProps,
      trades: tradesProps,
      chart: chartProps,
      orders: ordersProps,
      book: bookProps,
      dark: darkPanels,
    }

    return (
      <GridLayoutP
        autoSize
        className='layout'
        draggableHandle='.icon-move'
        cols={{
          lg: 100, md: 20, sm: 20, xs: 20, xxs: 20,
        }}
        rowHeight={25}
        margin={[16, 16]}
        layouts={{ lg: layoutDef.layout }}
        breakpoints={{
          lg: 1000, md: 996, sm: 768, xs: 480, xxs: 0,
        }}
        onLayoutChange={this.onLayoutChange}
      >
        {layoutDef.layout.map(def => (
          <div key={def.i}>
            {renderLayoutElement(layoutID, def, componentProps, onRemoveComponent)}
          </div>
        ))}
      </GridLayoutP>
    )
  }
}
