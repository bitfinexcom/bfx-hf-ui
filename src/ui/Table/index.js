import React from 'react'
import { AutoSizer, Table, Column } from 'react-virtualized'

import { defaultProps, propTypes } from './Table.props'

import 'react-virtualized/styles.css'
import './style.css'

export default class HFTable extends React.PureComponent {
  static propTypes = propTypes
  static defaultProps = defaultProps

  render () {
    const { data, columns, onRowClick, rowHeight, headerHeight } = this.props

    return (
      <AutoSizer>
        {({ width, height }) => (
          <Table
            autoHeight={false}
            height={height}
            width={width}

            rowHeight={rowHeight}
            rowGetter={({ index }) => data[index]}
            rowCount={data.length}
            onRowClick={onRowClick}

            headerHeight={headerHeight}
            disableHeader={false}

            gridStyle={{ outline: 'none' }}
          >
            {columns.map((c = {}) => (
              <Column
                key={c.dataKey}
                {...c}
              />
            ))}
          </Table>
        )}
      </AutoSizer>
    )
  }
}
