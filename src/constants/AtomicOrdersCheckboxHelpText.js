const checkboxesHelpMessages = {
  'REDUCE-ONLY':
    'Cancels the order if it would increase the size of an open position',
  HIDDEN:
    'This option allows you to place an order into the book but not have it displayed to other traders. Price/time priority is the same as a displayed order, but the hidden order will always pay the "taker" fee while those trading against a hidden order will pay the "maker" fee',
  OCO: 'This option allows you to place a pair of orders stipulating that if one order is executed fully or partially, then the other order is automatically canceled. A one-cancels-the-other order combines a stop order with a limit order. This option allows you to place both take profit and stop loss targets for your position (only for limit orders)',
  TIF: 'Time-In-Force: specify datetime for automatic order cancellation',
  'POST-ONLY':
    '"Post Only" limit orders are orders that allow you to be sure to always pay the maker fee. When placed, a "Post Only" limit order is either inserted into the order book or cancelled (only for limit orders)',
}

export default checkboxesHelpMessages
