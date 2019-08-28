export default () => ({
  label: 'Market',
  customHelp: 'A Market order will fill immediately at the current market price.',

  generateOrder: (data = {}, symbol, margin) => {
    const { amount } = data

    return {
      side: amount > 0 ? 'BUY' : 'SELL',
      type: 'MARKET',
      quantity: Math.abs(+amount),
      symbol,
    }
  },

  sections: [{
    title: '',
    name: 'general',
    rows: [
      ['price', 'amount'],
    ]
  }],

  fields: {
    price: {
      component: 'input.price',
      label: 'Price $QUOTE',
      disabled: true,
      default: 'MARKET',
    },

    amount: {
      component: 'input.amount',
      label: 'Amount $BASE',
    },
  },

  actions: ['sell', 'buy']
})
