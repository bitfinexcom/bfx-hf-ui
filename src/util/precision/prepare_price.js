import setSigFig from './set_sig_fig'

export default (price = 0) => {
  return setSigFig(price, 5)
}
