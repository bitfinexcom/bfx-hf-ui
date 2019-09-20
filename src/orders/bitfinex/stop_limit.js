import _isFinite from 'lodash/isFinite'

export default () => ({
  label: 'Stop Limit',
  customHelp: 'The Stop-Limit order type differs from the basic Stop order by allowing the specification of an exact price of execution.\n\nOnce the \'stop\' price is reached, a \'Limit\' order is created at the specified limit price.\n\nIf the \'hidden\' option is enabled, the order will be inserted in the order book but will not be visible to other users, and will execute as a TAKER.\n\nIf the \'reduce-only\' option is specified, the resulting Limit order will be cancelled if it would open or increase the size of an open position.\n\nA Time-In-Force date may be specified, after which the order will be automatically cancelled.',

  generateOrder: (data = {}, symbol, context) => {
    const {
      hidden, reduceonly, price, limitPrice, amount, tif, tifDate,
    } = data

    if (tif && (!_isFinite(tifDate) || tifDate === 0)) {
      throw new Error('TIF date required')
    }

    const orderDefinition = {
      type: context === 'm' ? 'STOP LIMIT' : 'EXCHANGE STOP LIMIT',
      priceAuxLimit: limitPrice,
      price,
      amount,
      symbol,
      hidden,
      reduceonly,
    }

    if (tif) {
      orderDefinition.tif = new Date(+tifDate).toISOString()
    }

    return orderDefinition
  },

  header: {
    component: 'ui.checkbox_group',
    fields: ['hidden', 'reduceonly', 'tif'],
  },

  sections: [{
    title: '',
    name: 'general',
    rows: [
      ['price', 'amount'],
      ['limitPrice', null],
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
  }],

  fields: {
    reduceonly: {
      component: 'input.checkbox',
      label: 'REDUCE-ONLY',
      default: false,
    },

    hidden: {
      component: 'input.checkbox',
      label: 'HIDDEN',
      default: false,
    },

    tif: {
      component: 'input.checkbox',
      label: 'TIF',
      default: false,
    },

    price: {
      component: 'input.price',
      label: 'Stop Price $QUOTE',
    },

    limitPrice: {
      component: 'input.price',
      label: 'Limit Price $QUOTE',
    },

    amount: {
      component: 'input.amount',
      label: 'Amount $BASE',
    },

    tifDate: {
      component: 'input.date',
      label: 'TIF Date',
    },
  },

  actions: ['sell', 'buy'],
})
