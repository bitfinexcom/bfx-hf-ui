import checkboxesHelpMessages from '../constants/AtomicOrdersCheckboxHelpText'

export default () => ({
  label: 'Market',
  uiIcon: 'market-active',
  customHelp: 'A Market order will fill immediately at the current market price.\n\nIf the \'reduce-only\' option is specified, the order will be cancelled if it would open or increase the size of an open position.',

  generateOrder: (data = {}, symbol, context) => {
    const { reduceonly, amount, lev } = data
    const orderDefinition = {
      type: context === 'm' || context === 'f' ? 'MARKET' : 'EXCHANGE MARKET',
      amount,
      symbol,
      reduceonly,
    }

    if (context === 'f') {
      orderDefinition.lev = lev
    }

    return orderDefinition
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
  }, {
    title: '',
    name: 'ticker',
    fullWidth: true,
    rows: [
      ['ticker'],
    ],
  }],

  fields: {
    reduceonly: {
      component: 'input.checkbox',
      label: 'REDUCE-ONLY',
      customHelp: checkboxesHelpMessages['REDUCE-ONLY'],
      trading: ['m'], // margin
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

    lev: {
      component: 'input.range',
      label: 'Leverage',
      min: 1,
      max: 100,
      default: 10,
    },

    ticker: {
      component: 'ui.ticker',
    },
  },

  actions: ['buy', 'sell'],
})
