export default [{
  width: 200,
  label: 'Created',
  dataKey: 'mts',
  cellRenderer: ({ rowData = {} }) => rowData.created,
}, {
  width: 80,
  label: 'Symbol',
  dataKey: 'symbol',
  cellRenderer: ({ rowData = {} }) => rowData.symbol,
}, {
  width: 120,
  label: 'Price',
  dataKey: 'price',
  cellRenderer: ({ rowData = {} }) => rowData.price,
}, {
  width: 120,
  label: 'Amount',
  dataKey: 'amount',
  cellRenderer: ({ rowData = {} }) => rowData.amount,
}, {
  width: 120,
  label: 'Status',
  dataKey: 'status',
  cellRenderer: ({ rowData = {} }) => rowData.status,
}, {
  width: 120,
  label: 'Type',
  dataKey: 'type',
  cellRenderer: ({ rowData = {} }) => rowData.type,
}]
