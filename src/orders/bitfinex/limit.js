import _isFinite from 'lodash/isFinite'

export default () => ({
  label: 'Limit',
  uiIcon: 'limit-active',
  customHelp: 'A Limit order submits a buy or sell order at the specified price. If the price is above or below the current best ask/bid (respectively for buy/sell orders) it will execute immediately as a TAKER order. Otherwise, it will be inserted into the order book and execute as a MAKER order when the market reaches the order\'s price.\n\nIf the \'hidden\' option is enabled, the order will be inserted in the order book but will not be visible to other users, and will execute as a TAKER.\n\nThe OCO (one-cancels-the-other) option may be used to submit a pair of orders; once one of the orders fills, the other is automatically cancelled.\n\nThe \'post-only\' option ensures the order is inserted into the order book instead of being immediately filled, and cancels it otherwise.\n\nA Time-In-Force date may be specified, after which the order will be automatically cancelled.',

  generateOrder: (data = {}, symbol, context) => {
    const {
      oco, hidden, postonly, tif, reduceonly, tifDate, ocoStop, price, amount, lev,
    } = data

    if (tif && (!_isFinite(tifDate) || tifDate === 0)) {
      throw new Error('TIF date required')
    }

    const orderDefinition = {
      type: context === 'm' || context === 'f' ? 'LIMIT' : 'EXCHANGE LIMIT',
      price,
      amount,
      hidden,
      symbol,
      postonly,
      oco,
      reduceonly,
    }

    if (oco) {
      orderDefinition.priceAuxLimit = ocoStop
    }

    if (tif) {
      orderDefinition.tif = new Date(+tifDate).toISOString()
    }

    if (context === 'f') {
      orderDefinition.lev = lev
    }

    return orderDefinition
  },

  header: {
    component: 'ui.checkbox_group',
    fields: ['oco', 'hidden', 'postonly', 'tif', 'reduceonly'],
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
      ['tifDate'],
    ],

    visible: {
      tif: { eq: true },
    },
  }, {
    title: '',
    name: 'oco',
    rows: [
      ['ocoStop', null],
    ],

    visible: {
      oco: { eq: true },
    },
  }, {
    title: '',
    name: 'lev',
    fullWidth: true,
    rows: [
      ['lev'],
    ],

    visible: {
      _context: { eq: 'f' },
    },
  }],

  fields: {
    reduceonly: {
      component: 'input.checkbox',
      label: 'REDUCE-ONLY',
      trading: ['m'],
      default: false,
    },

    hidden: {
      component: 'input.checkbox',
      label: 'HIDDEN',
      default: false,
    },

    oco: {
      component: 'input.checkbox',
      label: 'OCO',
      default: false,
    },

    postonly: {
      component: 'input.checkbox',
      label: 'POST-ONLY',
      default: false,
    },

    tif: {
      component: 'input.checkbox',
      label: 'TIF',
      default: false,
    },

    price: {
      component: 'input.price',
      label: 'Price $QUOTE',
    },

    ocoStop: {
      component: 'input.price',
      label: 'OCO Stop $QUOTE',
    },

    amount: {
      component: 'input.amount',
      label: 'Amount $BASE',
    },

    tifDate: {
      component: 'input.date',
      label: 'TIF Date',
    },

    lev: {
      component: 'input.range',
      label: 'Leverage',
      min: 1,
      max: 100,
      default: 10,
    },
  },

  actions: ['sell', 'buy'],
})
