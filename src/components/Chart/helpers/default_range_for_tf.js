import TIME_FRAME_WIDTHS from '../../../util/time_frame_widths'

export default (tf) => {
  const now = Date.now()

  return [now - (1000 * TIME_FRAME_WIDTHS[tf]), now]
}
