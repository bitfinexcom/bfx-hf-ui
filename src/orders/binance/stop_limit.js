import BigN from 'bignumber.js'

export default () => ({
  label: 'Stop-Limit',
  customHelp: 'The Stop-Limit order type differs from the basic Stop order by allowing the specification of an exact price of execution.\n\nOnce the \'stop\' price is reached, a \'Limit\' order is created at the specified limit price.',

  generateOrder: (data = {}, symbol, margin) => {
    const { tif, price, amount, stopPrice } = data

    return {
      side: amount > 0 ? 'BUY' : 'SELL',
      type: 'STOP_LOSS_LIMIT',
      quantity: Math.abs(+amount),
      timeInForce: tif,
      price: new BigN(stopPrice).toString(10),
      stopPrice: new BigN(price).toString(10),
      symbol,
    }
  },

  sections: [{
    title: '',
    name: 'general',
    rows: [
      ['price', 'amount'],
      ['stopPrice', null],
    ]
  }, {
    title: '',
    name: 'tif',
    fullWidth: true,
    rows: [
      ['tif']
    ],
  }],

  fields: {
    tif: {
      component: 'input.dropdown',
      label: 'Time-In-Force',
      default: 'GTC',
      options: {
        GTC: 'Good-Til-Cancelled',
        IOC: 'Immediate-Or-Cancel',
        FOK: 'Fill-Or-Kill',
      },
    },

    price: {
      component: 'input.price',
      label: 'Stop Price $QUOTE'
    },

    stopPrice: {
      component: 'input.price',
      label: 'Limit Price $QUOTE'
    },

    amount: {
      component: 'input.amount',
      label: 'Amount $BASE',
    },
  },

  actions: ['sell', 'buy']
})
