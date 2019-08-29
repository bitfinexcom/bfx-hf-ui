import BigN from 'bignumber.js'

export default () => ({
  label: 'Limit',
  customHelp: 'A Limit order submits a buy or sell order at the specified price. If the price is above or below the current best ask/bid (respectively for buy/sell orders) it will execute immediately as a TAKER order. Otherwise, it will be inserted into the order book and execute as a MAKER order when the market reaches the order\'s price.',

  generateOrder: (data = {}, symbol) => {
    const { tif, price, amount } = data

    return {
      side: amount > 0 ? 'BUY' : 'SELL',
      type: 'LIMIT',
      quantity: Math.abs(+amount),
      timeInForce: tif,
      price: new BigN(price).toString(10),
      symbol,
    }
  },

  sections: [{
    title: '',
    name: 'general',
    rows: [
      ['price', 'amount'],
    ],
  }, {
    title: '',
    name: 'tif',
    fullWidth: true,
    rows: [
      ['tif'],
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
      label: 'Price $QUOTE',
    },

    amount: {
      component: 'input.amount',
      label: 'Amount $BASE',
    },
  },

  actions: ['sell', 'buy'],
})
