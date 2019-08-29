export default () => ({
  label: 'Immediate or Cancel',
  customHelp: 'An IOC order is a limit order that must fill immediately, with any unfilled portion cancelled.',

  generateOrder: (data = {}, symbol, context) => {
    const { reduceonly, price, amount } = data

    return {
      type: context === 'm' ? 'IOC' : 'EXCHANGE IOC',
      price,
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
    },

    amount: {
      component: 'input.amount',
      label: 'Amount $BASE',
    },
  },

  actions: ['sell', 'buy'],
})
