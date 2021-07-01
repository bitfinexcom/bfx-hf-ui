import checkboxesHelpMessages from '../constants/AtomicOrdersCheckboxHelpText'

export default () => ({
  label: 'Fill or Kill',
  customHelp: 'An FOK order is a limit order that must fully fill immediately or it is canceled (killed).',
  uiIcon: 'fill-or-kill-active',

  generateOrder: (data = {}, symbol, context) => {
    const {
      reduceonly, price, amount, lev,
    } = data

    const orderDefinition = {
      type: context === 'm' || context === 'f' ? 'FOK' : 'EXCHANGE FOK',
      price,
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
      trading: ['m'],
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
    ticker: {
      component: 'ui.ticker',
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
