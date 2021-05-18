import _isFinite from 'lodash/isFinite'

export default () => ({
  label: 'Stop',
  uiIcon: 'stop-active',
  customHelp: 'Stop orders are automatically converted to Market orders once the specified stop price is reached.\n\nFor control over the execution price, use a Stop-Limit order.\n\nIf the \'reduce-only\' option is specified, the order will be cancelled if it would open or increase the size of an open position.\n\nA Time-In-Force date may be specified, after which the order will be automatically cancelled.',

  generateOrder: (data = {}, symbol, context) => {
    const {
      reduceonly, price, amount, tif, tifDate, lev,
    } = data

    if (tif && (!_isFinite(tifDate) || tifDate === 0)) {
      throw new Error('TIF date required')
    }

    const orderDefinition = {
      type: context === 'm' || context === 'f' ? 'STOP' : 'EXCHANGE STOP',
      price,
      amount,
      symbol,
      reduceonly,
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
    fields: ['reduceonly', 'tif'],
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

    tif: {
      component: 'input.checkbox',
      label: 'TIF',
      default: false,
    },

    price: {
      component: 'input.price',
      label: 'Stop Price $QUOTE',
    },

    amount: {
      component: 'input.amount',
      label: 'Amount $BASE',
    },

    tifDate: {
      component: 'input.date',
      label: 'TIF Date',
      default: new Date(Date.now() + 86400000),
      minDate: new Date(),
    },

    lev: {
      component: 'input.range',
      label: 'Leverage',
      min: 1,
      max: 100,
      default: 10,
    },
  },

  actions: ['buy', 'sell'],
})
