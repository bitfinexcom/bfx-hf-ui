export default (code = '-') => {
  switch (code) {
    case 'bu':
      return 'balance'

    case 'ps':
    case 'pn':
    case 'pu':
    case 'pc':
      return 'position'

    case 'ws':
    case 'wu':
      return 'wallet'

    case 'os':
    case 'on':
    case 'ou':
    case 'oc':
      return 'order'

    case 'te':
    case 'tu':
      return 'trades'

    case 'fte':
    case 'ftu':
      return 'f_trades'

    case 'hos':
      return 'h_orders'

    case 'mis':
    case 'miu':
      return 'margin_info'

    case 'n':
      return 'notification'

    case 'fos':
    case 'fon':
    case 'fou':
    case 'foc':
      return 'f_offer'

    case 'hfos':
      return 'hf_offer'

    case 'fcs':
    case 'fcn':
    case 'fcu':
    case 'fcc':
      return 'f_credits'

    case 'hfcs':
      return 'hf_credits'

    case 'fls':
    case 'fln':
    case 'flu':
    case 'flc':
      return 'f_loan'

    case 'hfls':
      return 'hf_loan'

    case 'hfts':
      return 'hf_trade'

    case 'uac':
      return 'user_custom_price_alert'

    case 'oc-req':
      return 'order_cancel'

    case 'hb':
      return 'hearthbeat'

    default:
      return null
  }
}
