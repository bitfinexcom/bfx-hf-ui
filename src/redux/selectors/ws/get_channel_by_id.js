import getChannels from './get_channels'

export default (state, exID, chanId) => {
  return getChannels(state, exID)[chanId]
}
