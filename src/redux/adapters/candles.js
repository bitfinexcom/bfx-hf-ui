import { Candle } from 'bfx-api-node-models'

export default function candlesAdapter(data = {}) {
  return new Candle(data).toJS()
}
