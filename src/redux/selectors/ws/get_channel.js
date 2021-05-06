import _isEqual from 'lodash/isEqual'
import getChannels from './get_channels'

export default (state, filter) => {
  const channels = Object.values(getChannels(state))

  return channels.find(chan => (
    !Object.keys(filter).find(filterKey => (
      !_isEqual(chan[filterKey], filter[filterKey])
    ))
  ))
}
