export default () => ({
  label: 'Market',
  customHelp: 'A Market order will fill immediately at the current market price.\n\nIf the \'reduce-only\' option is specified, the order will be cancelled if it would open or increase the size of an open position.',

  generateOrder: (data = {}, symbol, context) => {
    const { reduceonly, amount } = data

    return {
      type: context === 'm' ? 'MARKET' : 'EXCHANGE MARKET',
      amount,
      symbol,
      reduceonly,
    }
  },

  header: {
    component: 'ui.checkbox_group',
    fields: ['reduceonly'],
  },

  sections: [{
    title: '',
    name: 'general',
    rows: [
      ['price', 'amount'],
    ],
  }],

  fields: {
    reduceonly: {
      component: 'input.checkbox',
      label: 'REDUCE-ONLY',
      default: false,
    },

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

  actions: ['sell', 'buy'],
})
