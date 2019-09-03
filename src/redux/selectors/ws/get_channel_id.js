import getChannel from './get_channel'

export default (state, filter) => {
  const channel = getChannel(state, filter) || {}
  return channel.chanId
}
