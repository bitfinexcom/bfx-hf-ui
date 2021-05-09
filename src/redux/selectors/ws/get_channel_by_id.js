import getChannels from './get_channels'

export default (state, chanId) => {
  return getChannels(state)[chanId]
}
